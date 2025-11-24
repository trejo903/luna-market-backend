import { Test, TestingModule } from '@nestjs/testing';
import { ImgproductosService } from './imgproductos.service';

describe('ImgproductosService', () => {
  let service: ImgproductosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImgproductosService],
    }).compile();

    service = module.get<ImgproductosService>(ImgproductosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
