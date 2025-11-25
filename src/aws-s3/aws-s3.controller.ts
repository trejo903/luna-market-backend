import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { CreateAwsS3Dto } from './dto/create-aws-s3.dto';
import { UpdateAwsS3Dto } from './dto/update-aws-s3.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('aws-s3')
export class AwsS3Controller {
  constructor(private readonly awsS3Service: AwsS3Service) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file',{
      limits:{fileSize:5*1024*1024}
    })
  )
  async upload(@UploadedFile() file: Express.Multer.File){
    if(!file){
      throw new BadRequestException('No se recibio el archivo')
    }
    const url = await this.awsS3Service.uploadImage(file,'test')
    return {url}
  }
}
