// import {
//   Controller,
//   Post,
//   UploadedFile,
//   UseInterceptors,
//   ParseFilePipe,
//   MaxFileSizeValidator,
//   FileTypeValidator,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { FilesService } from './files.service';
// import { Movements } from 'src/movements/movements.entity';

// @Controller('files')
// export class FilesController {
//   constructor(private filesService: FilesService) {}

//   @Post()
//   @UseInterceptors(FileInterceptor('file'))
//   uploadFile(
//     @UploadedFile(
//       new ParseFilePipe({
//         validators: [
//           new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
//           new FileTypeValidator({ fileType: 'text/csv' }),
//         ],
//       }),
//     )
//     file: Express.Multer.File,
//   ): Promise<Movements[]> {
//     return this.filesService.uploadFile(file);
//   }
// }
