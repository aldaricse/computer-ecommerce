import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test simple de conexión
    await prisma.$connect()
    
    // Test de query básica
    const result = await prisma.$queryRaw`SELECT 1 as test`
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      result
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      status: 'error',
      message: error.message,
      code: error.code
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}