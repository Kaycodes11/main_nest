# configuration namespaces

```ts
[ path ]: src / config / db.config.ts;

import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
    return {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT || 5432,
    };
});

[ path ]: src / app.module.ts;

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [dbConfig],
            isGlobal: true,
            cache: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

[ path ]: src / app.service.ts;

// this ConfigService can be excluded if used {isGlboal: true} on "app.module.ts"
import { ConfigService, ConfigType } from '@nestjs/config';

@Injectable()
export class AppService {
    constructor(private readonly configService: ConfigService) {
        console.log(this.configService.get<string>('database.host'));
    }
}
```

//-----------------------------------------------------------------------------------------

# Partial registration: to add config specifically for a feature module e.g. database

```ts

[ path ]: src / app.module.ts

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [dbConfig],
            isGlobal: true,
            cache: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

[ path ]: src / database / database.module.ts
NOTE: {isGlobal: true} allows to skip "ConfigService import within any module's service"

@Module({
  // imports: [ConfigModule.forFeature(databaseConfig)]
    imports: [
        ConfigModule.forFeature({
            load: [dbConfig],
            cache: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class DatabaseModule {}

```

# joi is schema validator that can validate any object: so validate the db_config

```ts
[ path ]: src / app.module.ts;

.....
import  * as Joi from "joi";

@Module({
    imports: [ConfigModule.forRoot(
      {
        validationSchema: Joi.object({
          NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
          PORT: Joi.number().default(3000),
          }),
          validationOptions: {
            allowUnknown: false,
          abortEarly: true,
          },
      }
    )],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
```

// ---------------------------------------------------------------------------------------

# env validation but with class-transformer

```ts

[ path ]: src / config / env.validation.ts

import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, validateSync } from 'class-validator';

enum Environment {
Development = "development",
Production = "production",
Test = "test",
Provision = "provision",
}

class EnvironmentVariables {
@IsEnum(Environment)
NODE_ENV: Environment;

@IsNumber()
PORT: number;
}

export function validate(config: Record<string, unknown>) {
const validatedConfig = plainToInstance(
EnvironmentVariables,
config,
{ enableImplicitConversion: true },
);
const errors = validateSync(validatedConfig, { skipMissingProperties: false });

if (errors.length > 0) {
throw new Error(errors.toString());
}
return validatedConfig;
}

[ path ]: src / app.module.ts

.......
import { validate } from './env.validation';

@Module({
imports: [ ConfigModule.forRoot({ validate}) ],
})
export class AppModule {}

```

// -----------------------------------------------------------------------------------------------------

# make custom getter from configService: if needed

```ts

[ path ]: src / api / api-config.service.ts

@Injectable()
export class ApiConfigService {
constructor(private configService: ConfigService) {}

get isAuthEnabled(): boolean {
return this.configService.get('AUTH_ENABLED') === 'true';
}
}

[ path ]: src / app.service.ts

@Injectable()
export class AppService {
constructor(apiConfigService: ApiConfigService) {
if (apiConfigService.isAuthEnabled) {  }
}
}

```

# Environment variable loaded hook: to ensure env variables loaded from some .env files before module

```ts

1. "only when a module's configuration depends on env variables" and its loaded from the ".env" fie,
2. then use ConfigModule.envVariablesLoaded to ensure given "ConfigModule.envVariablesLoaded" loaded first

[ path ]:  src / storage / storage.module.ts

export async function getStorageModule() {
await ConfigModule.envVariablesLoaded;
return process.env.STORAGE === 'S3' ? S3StorageModule : DefaultStorageModule;
}

```

# Multiple Databases

```ts


[path] : src / config / db.config.ts

export default {
  dialect: 'postgres',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'db',
  synchronize: true,
};


[path]: src / app.module.ts

// Same database but different host e.g. database1: localhost, database2: postgresql://<remote_host>
// same database but running from / host are different

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...defaultOptions,
      host: 'user_db_host',
      models: [User],
    }),
    SequelizeModule.forRoot({
      ...defaultOptions,
      name: 'albumsConnection',
      host: 'album_db_host',
      models: [Album],
    }),
  ],
})
export class AppModule {}

[ path ]: src / albums / albums.module.ts

@Module({
  imports: [SequelizeModule.forFeature([Album], 'albumsConnection')],
  providers: [
    {
      provider: AlbumsService,
      useFactory: (albumsSequelize: Sequelize) => {
      return new AlbumsService(albumsSequelize);
      },
      inject: [getDataSourceToken('albumsConnection')]
    }
  ]
})

[ path ]: src / albums / albums.module.ts : ( injecting sequelize connection within a service )

@Injectable()
export class AlbumsService {
  constructor(
    @InjectConnection('albumsConnection') private sequelize: Sequelize,
    @Inject(AlbumsService) private sequelize_instance_use_if_provided_inModule: AlbumsService
    ) {
      // now use this this.sequelize instance to do whatever; usage: transaction
    }
}

```

# Testing with a Mock table / Mock Model

```ts
@Module({
  providers: [
    UsersService,
    {
      // wherever this User + "Model" is injected; it'll use mockModel as its value always
      provide: getModelToken(User),
      useValue: mockModel,
    },
  ],
})
export class UsersModule {}

[ path ] : src / users / users.service.ts

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel) private readonly userModel: UserModel) {
    // this.userModel now will refer to properties and methods of mockModel
  }
}

```

# async configuration with useFactory or useClass

```ts
SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    dialect: 'mysql',
    host: configService.get('HOST'),
    port: +configService.get('PORT'),
    username: configService.get('USERNAME'),
    password: configService.get('PASSWORD'),
    database: configService.get('DATABASE'),
    models: [],
  }),
  inject: [ConfigService],
});

SequelizeModule.forRootAsync({
  useClass: SequelizeConfigService, // SequelizeConfigService will be instantiated here automatically
});

@Injectable()
class SequelizeConfigService implements SequelizeOptionsFactory {
  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      models: [],
    };
  }
}

// to prevent the creation of SequelizeConfigService inside SequelizeModule and use a provider imported from a different module, you can use the useExisting syntax.

SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
});

// here SequelizeModule will lookup imported modules to reuse an existing ConfigService instead of instantiating a new one.
```
