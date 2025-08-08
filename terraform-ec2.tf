# AWS EC2 instance provisioning script
# Run this locally to create EC2 instance for OneLastAI.com

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.large"
}

variable "key_pair_name" {
  description = "AWS Key Pair name"
  type        = string
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = "onelastai.com"
}

# Configure AWS Provider
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Get latest Ubuntu AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Create VPC
resource "aws_vpc" "onelastai_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "OneLastAI-VPC"
  }
}

# Create Internet Gateway
resource "aws_internet_gateway" "onelastai_igw" {
  vpc_id = aws_vpc.onelastai_vpc.id

  tags = {
    Name = "OneLastAI-IGW"
  }
}

# Create Public Subnet
resource "aws_subnet" "onelastai_public_subnet" {
  vpc_id                  = aws_vpc.onelastai_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = {
    Name = "OneLastAI-Public-Subnet"
  }
}

# Create Route Table
resource "aws_route_table" "onelastai_public_rt" {
  vpc_id = aws_vpc.onelastai_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.onelastai_igw.id
  }

  tags = {
    Name = "OneLastAI-Public-RT"
  }
}

# Associate Route Table with Subnet
resource "aws_route_table_association" "onelastai_public_rta" {
  subnet_id      = aws_subnet.onelastai_public_subnet.id
  route_table_id = aws_route_table.onelastai_public_rt.id
}

# Create Security Group
resource "aws_security_group" "onelastai_sg" {
  name        = "onelastai-security-group"
  description = "Security group for OneLastAI.com platform"
  vpc_id      = aws_vpc.onelastai_vpc.id

  # SSH access
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP access
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS access
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # All outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "OneLastAI-SecurityGroup"
  }
}

# Create Elastic IP
resource "aws_eip" "onelastai_eip" {
  domain = "vpc"
  
  tags = {
    Name = "OneLastAI-ElasticIP"
  }
}

# Create EC2 Instance
resource "aws_instance" "onelastai_server" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  key_name              = var.key_pair_name
  subnet_id             = aws_subnet.onelastai_public_subnet.id
  vpc_security_group_ids = [aws_security_group.onelastai_sg.id]

  root_block_device {
    volume_type = "gp3"
    volume_size = 30
    encrypted   = true
  }

  user_data = base64encode(templatefile("${path.module}/user-data.sh", {
    domain_name = var.domain_name
  }))

  tags = {
    Name        = "OneLastAI-Server"
    Environment = "production"
    Application = "onelastai.com"
  }
}

# Associate Elastic IP with EC2 Instance
resource "aws_eip_association" "onelastai_eip_assoc" {
  instance_id   = aws_instance.onelastai_server.id
  allocation_id = aws_eip.onelastai_eip.id
}

# Outputs
output "instance_public_ip" {
  value = aws_eip.onelastai_eip.public_ip
}

output "instance_public_dns" {
  value = aws_instance.onelastai_server.public_dns
}

output "ssh_command" {
  value = "ssh -i ${var.key_pair_name}.pem ubuntu@${aws_eip.onelastai_eip.public_ip}"
}

output "domain_dns_setup" {
  value = {
    main_domain = "Point ${var.domain_name} A record to ${aws_eip.onelastai_eip.public_ip}"
    subdomains = [
      "Point chat.${var.domain_name} A record to ${aws_eip.onelastai_eip.public_ip}",
      "Point creator.${var.domain_name} A record to ${aws_eip.onelastai_eip.public_ip}",
      "Point mood.${var.domain_name} A record to ${aws_eip.onelastai_eip.public_ip}",
      "Point ip.${var.domain_name} A record to ${aws_eip.onelastai_eip.public_ip}",
      "Point visual.${var.domain_name} A record to ${aws_eip.onelastai_eip.public_ip}",
      "Point blog.${var.domain_name} A record to ${aws_eip.onelastai_eip.public_ip}",
      "Point memory.${var.domain_name} A record to ${aws_eip.onelastai_eip.public_ip}"
    ]
  }
}
