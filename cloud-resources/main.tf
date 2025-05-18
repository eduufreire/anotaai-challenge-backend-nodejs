terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region     = "us-east-1"
  access_key = "test"
  secret_key = "test"

  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  s3_use_path_style           = true

  endpoints {
    s3     = "http://s3.localhost.localstack.cloud:4566"
    sqs    = "http://localhost:4566"
  }
}

resource "aws_s3_bucket" "catalog_owner" {
  bucket = "catalog-owner-anotaai-challenge"
}

resource "aws_sqs_queue" "catalog_emit_topic" {
  name                      = "catalog-emit-topic"
  delay_seconds             = 90
  max_message_size          = 2048
  message_retention_seconds = 86400
  receive_wait_time_seconds = 10
}