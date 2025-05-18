// Points calculation constants
const POINTS_PER_KG = 5; // 5 points per kg of waste
const MINIMUM_QUANTITY_FOR_POINTS = 1; // Minimum quantity required to earn points

/**
 * Calculate points based on order quantity
 * @param {number} quantity - Order quantity in kg
 * @returns {number} - Points to be awarded
 */
export function calculatePoints(quantity) {
  if (quantity < MINIMUM_QUANTITY_FOR_POINTS) return 0;
  return Math.floor(quantity * POINTS_PER_KG);
}

/**
 * Distribute points to individual users
 * @param {PrismaClient} prisma - Prisma client instance
 * @param {number} points - Points to distribute
 * @returns {Promise<void>}
 */
export async function distributePoints(prisma, points) {
  try {
    // Get all individual users
    const individualUsers = await prisma.user.findMany({
      where: {
        userType: 'INDIVIDUAL',
      },
      select: {
        id: true,
        points: true,
      },
    });

    if (individualUsers.length === 0) return;

    // Calculate points per user
    const pointsPerUser = Math.floor(points / individualUsers.length);

    // Update points for each individual user
    await Promise.all(
      individualUsers.map((user) => {
        return prisma.user.update({
          where: { id: user.id },
          data: {
            points: {
              increment: pointsPerUser,
            },
          },
        });
      })
    );

    console.log(`✅ Successfully distributed ${points} points among ${individualUsers.length} individual users`);
  } catch (error) {
    console.error('Error distributing points:', error);
    throw error;
  }
} 