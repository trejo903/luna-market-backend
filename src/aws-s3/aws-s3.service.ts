import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable,Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class AwsS3Service {
  private readonly logger = new Logger(AwsS3Service.name)
  private s3: S3Client
  private bucket:string
  private publicUrlBase:string

  constructor(){
    this.s3 = new S3Client({
      region:process.env.AWS_REGION,
      credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY!
      }
    })

    this.bucket=process.env.AWS_S3_BUCKET!
    this.publicUrlBase=
    process.env.AWS_S3_PUBLIC_URL ||
      `https://${this.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com`;
  }

  async uploadImage(file:Express.Multer.File,folder='sitios'){
    if(!file){
      throw new Error('No se recibio ningun archivo')
    }
    const ext = file.originalname.split('.').pop() || 'jpg'
    const key = `${folder}/${randomUUID()}.${ext}`
    const command = new PutObjectCommand({
      Bucket:this.bucket,
      Key:key,
      Body:file.buffer,
      ContentType:file.mimetype
    })


    try {
      await this.s3.send(command)
    } catch (error) {
        this.logger.error('Error subiendo a s3')
        throw error
    }
    return `${this.publicUrlBase}/${key}`
  }

}
