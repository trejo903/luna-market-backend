import { Test, TestingModule } from '@nestjs/testing';
import { ImgproductosController } from './imgproductos.controller';
import { ImgproductosService } from './imgproductos.service';

describe('ImgproductosController', () => {
  let controller: ImgproductosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImgproductosController],
      providers: [ImgproductosService],
    }).compile();

    controller = module.get<ImgproductosController>(ImgproductosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
