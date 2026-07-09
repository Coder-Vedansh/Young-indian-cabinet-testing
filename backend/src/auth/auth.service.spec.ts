import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../common/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../common/services/email.service';
import { ConflictException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
            role: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
            userRole: {
              create: jest.fn(),
            },
            otp: {
              create: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockJwtToken'),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendOtp: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should throw ConflictException if user exists', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce({ id: '1', email: 'test@test.com' } as any);

      await expect(service.register({
        email: 'test@test.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe',
      })).rejects.toThrow(ConflictException);
    });
  });
});
