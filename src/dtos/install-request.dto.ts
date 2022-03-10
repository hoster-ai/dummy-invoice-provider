export class InstallRequestDto {
  policy: {
    userId: string;
    default: boolean;
    title: string;
    description: string;
  };
  providerId: string;
}
