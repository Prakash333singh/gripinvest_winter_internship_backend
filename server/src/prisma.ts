//create a central client  to avoid multiple instances

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();