-- User, Role and UserRole joining when userId = 'b39944bb-7aed-4f30-b091-81b963109410'
SELECT
    "User"."id" AS "userId",
    "User"."email",
    "User"."isVerified",
    "User"."deletedAt",
    "roles"."id" AS "roles.id",
    "roles"."title" AS "roles.title",
    -- "roles->UserRole"."UserId" AS "roles.UserRole.UserId",
    -- "roles->UserRole"."RoleId" AS "roles.UserRole.RoleId"
FROM
    "Users" AS "User"
    LEFT JOIN (
        "UserRoles" AS "roles->userRole"
        INNER JOIN "Roles" AS "roles" ON "roles->userRole"."RoleId" = "roles"."id"
    ) ON "User"."id" = "roles->UserRole"."UserId"
WHERE
    (
        "User"."deletedAt" IS NULL
        and "User"."id" = 'b39944bb-7aed-4f30-b091-81b963109410'
    );

-- same query but using INNER JOIN than the LEFT JOIN
SELECT
    "User"."id",
    "User"."firstName",
    "User"."lastName",
    "User"."email",
    "User"."password",
    "User"."gender",
    "User"."mobile",
    "User"."isVerified",
    "User"."createdAt",
    "User"."updatedAt",
    "User"."deletedAt",
    "roles"."id" AS "roles.id",
    "roles"."title" AS "roles.title"
FROM
    "Users" AS "User"
    INNER JOIN (
        "UserRoles" AS "roles->UserRole"
        INNER JOIN "Roles" AS "roles" ON "roles"."id" = "roles->UserRole"."RoleId"
    ) ON "User"."id" = "roles->UserRole"."UserId"
WHERE
    (
        "User"."deletedAt" IS NULL
        AND (
            "User"."id" = 'b39944bb-7aed-4f30-b091-81b963109410'
            AND "User"."isVerified" = true
            AND "roles"."title" IN ('hr')
        )
    );