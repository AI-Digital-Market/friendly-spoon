import express, { Request, Response } from 'express';
import { optionalAuthMiddleware } from '@/middleware/auth.js';
import { config } from '@/config/config.js';
import { logger } from '@/config/logger.js';
import { asyncHandler, createError } from '@/middleware/errorHandler.js';

const router = express.Router();

// Get IP information
router.get('/info', optionalAuthMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const clientIp = getClientIp(req);
  
  if (!clientIp) {
    throw createError(400, 'Unable to determine IP address', 'IP_NOT_FOUND');
  }

  try {
    const ipInfo = await getIpInformation(clientIp);
    
    logger.info('IP info requested:', {
      userId: req.userId || 'anonymous',
      ip: clientIp,
      country: ipInfo.country
    });

    res.json({
      success: true,
      ip: clientIp,
      info: ipInfo,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('IP info error:', error);
    throw createError(500, 'Failed to get IP information', 'IP_INFO_ERROR', error.message);
  }
}));

// Get detailed geolocation
router.get('/geolocation', optionalAuthMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const clientIp = getClientIp(req);
  
  if (!clientIp) {
    throw createError(400, 'Unable to determine IP address', 'IP_NOT_FOUND');
  }

  try {
    const geoInfo = await getGeolocationInfo(clientIp);
    
    logger.info('Geolocation requested:', {
      userId: req.userId || 'anonymous',
      ip: clientIp,
      city: geoInfo.city,
      country: geoInfo.country
    });

    res.json({
      success: true,
      ip: clientIp,
      geolocation: geoInfo,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('Geolocation error:', error);
    throw createError(500, 'Failed to get geolocation', 'GEOLOCATION_ERROR', error.message);
  }
}));

// Get ISP and organization information
router.get('/isp', optionalAuthMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const clientIp = getClientIp(req);
  
  if (!clientIp) {
    throw createError(400, 'Unable to determine IP address', 'IP_NOT_FOUND');
  }

  try {
    const ispInfo = await getIspInfo(clientIp);
    
    logger.info('ISP info requested:', {
      userId: req.userId || 'anonymous',
      ip: clientIp,
      isp: ispInfo.isp
    });

    res.json({
      success: true,
      ip: clientIp,
      isp: ispInfo,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('ISP info error:', error);
    throw createError(500, 'Failed to get ISP information', 'ISP_INFO_ERROR', error.message);
  }
}));

// Check if IP is using VPN/Proxy
router.get('/vpn-check', optionalAuthMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const clientIp = getClientIp(req);
  
  if (!clientIp) {
    throw createError(400, 'Unable to determine IP address', 'IP_NOT_FOUND');
  }

  try {
    const vpnInfo = await checkVpnProxy(clientIp);
    
    logger.info('VPN check requested:', {
      userId: req.userId || 'anonymous',
      ip: clientIp,
      isVpn: vpnInfo.isVpn,
      isProxy: vpnInfo.isProxy
    });

    res.json({
      success: true,
      ip: clientIp,
      vpnCheck: vpnInfo,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('VPN check error:', error);
    throw createError(500, 'Failed to check VPN/Proxy', 'VPN_CHECK_ERROR', error.message);
  }
}));

// Get security information
router.get('/security', optionalAuthMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const clientIp = getClientIp(req);
  
  if (!clientIp) {
    throw createError(400, 'Unable to determine IP address', 'IP_NOT_FOUND');
  }

  try {
    const securityInfo = await getSecurityInfo(clientIp);
    
    logger.info('Security info requested:', {
      userId: req.userId || 'anonymous',
      ip: clientIp,
      threatLevel: securityInfo.threatLevel
    });

    res.json({
      success: true,
      ip: clientIp,
      security: securityInfo,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('Security info error:', error);
    throw createError(500, 'Failed to get security information', 'SECURITY_INFO_ERROR', error.message);
  }
}));

// Bulk IP lookup
router.post('/bulk', optionalAuthMiddleware, asyncHandler(async (req: Request, res: Response) => {
  const { ips } = req.body;
  
  if (!ips || !Array.isArray(ips)) {
    throw createError(400, 'Array of IP addresses is required', 'MISSING_IPS');
  }

  if (ips.length > 10) {
    throw createError(400, 'Maximum 10 IP addresses allowed', 'TOO_MANY_IPS');
  }

  try {
    const results = await Promise.allSettled(
      ips.map(async (ip: string) => {
        if (!isValidIp(ip)) {
          throw new Error(`Invalid IP address: ${ip}`);
        }
        return {
          ip,
          info: await getIpInformation(ip)
        };
      })
    );

    const successfulResults = results
      .filter((result, index) => {
        if (result.status === 'rejected') {
          logger.warn('Bulk IP lookup failed for IP:', ips[index], result.reason);
          return false;
        }
        return true;
      })
      .map(result => (result as PromiseFulfilledResult<any>).value);

    const failedResults = results
      .map((result, index) => ({
        ip: ips[index],
        error: result.status === 'rejected' ? result.reason.message : null
      }))
      .filter(result => result.error);

    logger.info('Bulk IP lookup completed:', {
      userId: req.userId || 'anonymous',
      totalRequested: ips.length,
      successful: successfulResults.length,
      failed: failedResults.length
    });

    res.json({
      success: true,
      results: successfulResults,
      failed: failedResults,
      summary: {
        total: ips.length,
        successful: successfulResults.length,
        failed: failedResults.length
      },
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    logger.error('Bulk IP lookup error:', error);
    throw createError(500, 'Failed to process bulk IP lookup', 'BULK_LOOKUP_ERROR', error.message);
  }
}));

// Helper functions
function getClientIp(req: Request): string | null {
  return (
    req.headers['cf-connecting-ip'] as string ||
    req.headers['x-real-ip'] as string ||
    req.headers['x-forwarded-for']?.toString().split(',')[0] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    null
  );
}

async function getIpInformation(ip: string): Promise<any> {
  if (!config.apiKeys.ipinfo) {
    // Return basic information without API
    return {
      ip,
      type: isPrivateIp(ip) ? 'private' : 'public',
      version: ip.includes(':') ? 'IPv6' : 'IPv4',
      isPrivate: isPrivateIp(ip),
      note: 'Limited information available without API key'
    };
  }

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`https://ipinfo.io/${ip}?token=${config.apiKeys.ipinfo}`);
    
    if (!response.ok) {
      throw new Error(`IPInfo API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      countryName: getCountryName(data.country),
      location: data.loc,
      organization: data.org,
      postal: data.postal,
      timezone: data.timezone,
      isPrivate: isPrivateIp(ip),
      type: isPrivateIp(ip) ? 'private' : 'public',
      version: ip.includes(':') ? 'IPv6' : 'IPv4'
    };
  } catch (error) {
    throw new Error(`Failed to get IP information: ${error.message}`);
  }
}

async function getGeolocationInfo(ip: string): Promise<any> {
  const basicInfo = await getIpInformation(ip);
  
  if (basicInfo.location) {
    const [lat, lng] = basicInfo.location.split(',');
    return {
      ...basicInfo,
      coordinates: {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng)
      },
      accuracy: 'city',
      source: 'ipinfo'
    };
  }

  return {
    ...basicInfo,
    coordinates: null,
    accuracy: 'unknown',
    source: 'basic'
  };
}

async function getIspInfo(ip: string): Promise<any> {
  const info = await getIpInformation(ip);
  
  return {
    ip,
    isp: info.organization || 'Unknown',
    organization: info.organization || 'Unknown',
    connectionType: guessConnectionType(info.organization),
    autonomous_system: null // Would need additional API for ASN info
  };
}

async function checkVpnProxy(ip: string): Promise<any> {
  // Basic VPN/Proxy detection (would need specialized service for accuracy)
  const info = await getIpInformation(ip);
  
  const vpnIndicators = [
    'vpn', 'proxy', 'hosting', 'datacenter', 'cloud', 'server',
    'amazon', 'google', 'microsoft', 'digitalocean'
  ];

  const org = (info.organization || '').toLowerCase();
  const hasVpnIndicator = vpnIndicators.some(indicator => org.includes(indicator));

  return {
    ip,
    isVpn: hasVpnIndicator,
    isProxy: hasVpnIndicator,
    isTor: false, // Would need Tor exit node list
    confidence: hasVpnIndicator ? 'medium' : 'low',
    indicators: hasVpnIndicator ? ['Organization name suggests VPN/Proxy'] : [],
    note: 'Basic detection - specialized service recommended for production'
  };
}

async function getSecurityInfo(ip: string): Promise<any> {
  const vpnCheck = await checkVpnProxy(ip);
  
  return {
    ip,
    threatLevel: 'unknown',
    isBlacklisted: false,
    isMalicious: false,
    reputation: 'unknown',
    vpnDetection: vpnCheck,
    lastSeen: null,
    note: 'Basic security check - threat intelligence service recommended for production'
  };
}

function isValidIp(ip: string): boolean {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

function isPrivateIp(ip: string): boolean {
  const privateRanges = [
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[01])\./,
    /^192\.168\./,
    /^127\./,
    /^169\.254\./,
    /^::1$/,
    /^fc00:/,
    /^fe80:/
  ];

  return privateRanges.some(range => range.test(ip));
}

function getCountryName(code: string): string {
  const countries: Record<string, string> = {
    'US': 'United States',
    'CA': 'Canada',
    'GB': 'United Kingdom',
    'DE': 'Germany',
    'FR': 'France',
    'JP': 'Japan',
    'CN': 'China',
    'IN': 'India',
    'AU': 'Australia',
    'BR': 'Brazil'
    // Add more as needed
  };

  return countries[code] || code;
}

function guessConnectionType(organization: string): string {
  const org = (organization || '').toLowerCase();
  
  if (org.includes('mobile') || org.includes('cellular')) return 'mobile';
  if (org.includes('cable') || org.includes('broadband')) return 'broadband';
  if (org.includes('fiber') || org.includes('fibre')) return 'fiber';
  if (org.includes('dsl')) return 'dsl';
  if (org.includes('satellite')) return 'satellite';
  if (org.includes('wifi') || org.includes('wireless')) return 'wireless';
  
  return 'unknown';
}

export default router;
