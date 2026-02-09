export interface GetHealthResponseDto {
  status: 'up' | 'down' | 'degraded';
  info: Record<string, unknown>;
  error: Record<string, { message: string }> | null;
  details: Record<string, unknown>;
}
