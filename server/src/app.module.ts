import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { PictureModule } from './picture/picture.module';
import { PostModule } from './post/post.module';
import { TopicModule } from './topic/topic.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', 
        autoLoadEntities: true,
        host: configService.get('TYPEORM_HOST'), 
        port: configService.get<number>('TYPEORM_PORT'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'), 
        timezone: 'z', 
        synchronize: true, 
      }),
    }),
    UserModule,
    AuthModule,
    PostModule,
    LikeModule,
    BookmarkModule,
    PictureModule,
    CommentModule,
    TopicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
