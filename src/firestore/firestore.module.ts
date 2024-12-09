import { Module, DynamicModule, Global } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';

@Global()
@Module({})
export class FirestoreModule {
  static forRoot(keyFilename: string): DynamicModule {
    const firestoreProvider = {
      provide: Firestore,
      useFactory: () => new Firestore({ keyFilename }),
    };

    return {
      module: FirestoreModule,
      providers: [firestoreProvider],
      exports: [firestoreProvider],
    };
  }
}
