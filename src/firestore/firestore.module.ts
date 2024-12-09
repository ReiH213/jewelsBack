import { Module, DynamicModule, Global } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';

@Global()
@Module({})
export class FirestoreModule {
  static forRoot(): DynamicModule {
    const firestoreProvider = {
      provide: Firestore,
      useFactory: () =>
        new Firestore({
          projectId: process.env.FIREBASE_PROJECT_ID,
          credentials: {
            private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(
              /\\n/g,
              '\n',
            ),
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
          },
        }),
    };

    return {
      module: FirestoreModule,
      providers: [firestoreProvider],
      exports: [firestoreProvider],
    };
  }
}
