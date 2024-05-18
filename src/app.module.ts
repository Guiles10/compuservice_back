import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
// import { TasksModule } from './modules/tasks/tasks.module';
// import { CommentsModule } from './modules/comments/comments.module';
// import { CardsModule } from './modules/cards/cards.module';
// import { ClientModule } from './modules/client/client.module';
// import { ResponsibleModule } from './modules/responsible/responsible.module';
// import { FileModule } from './modules/file/file.module';

// TasksModule, CommentsModule, CardsModule, ClientModule, ResponsibleModule, FileModule

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
