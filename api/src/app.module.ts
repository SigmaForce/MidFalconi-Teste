import { Module } from "@nestjs/common";

import { ProfilesModule } from "./profiles/profiles.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [ProfilesModule, UsersModule],
})
export class AppModule {}
