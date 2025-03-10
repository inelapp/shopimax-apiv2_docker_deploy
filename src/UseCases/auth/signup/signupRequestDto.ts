export interface SignupRequestDto {
    username?: string;
    email: string;
    password: string;
    roles?: Array<string>;
}