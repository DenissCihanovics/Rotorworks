import { Module } from '@nestjs/common'
import { MetricsModule } from './metrics/metrics.module'
import { FiltersModule } from './filters/filters.module'
import { EntriesModule } from './entries/entries.module'
import { AuthModule } from './auth/auth.module'
import { SettingsModule } from './settings/settings.module'

@Module({
  imports: [AuthModule, MetricsModule, FiltersModule, EntriesModule, SettingsModule],
})
export class AppModule {}