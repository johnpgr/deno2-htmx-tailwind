import { boolean, index, pgTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const User = pgTable(
    "users",
    {
        id: varchar({ length: 26 }).primaryKey(),
        name: varchar({ length: 32 }).notNull().unique(),
        email: varchar({ length: 255 }).notNull().unique(),
        emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
        bio: varchar({ length: 2000 }),
        hashedPassword: text("hashed_password").notNull(),
    },
    (table) => {
        return {
            idxUserUsername: index("idx_user_username").on(table.name),
        }
    },
)

export const Session = pgTable("sessions", {
    id: varchar({ length: 26 }).primaryKey(),
    userId: varchar("user_id", { length: 26 })
        .notNull()
        .references(() => User.id, { onDelete: "cascade" }),
    token: text().notNull(),
    refreshToken: text("refresh_token").notNull(),
    ipAddress: varchar("ip_address", { length: 45 }).notNull(),
    userAgent: text("user_agent").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
})

export const Post = pgTable(
    "posts",
    {
        id: varchar("id", { length: 26 }).primaryKey(),
        authorId: varchar("author_id", { length: 26 })
            .notNull()
            .references(() => User.id, { onDelete: "cascade" }),
        slug: varchar({ length: 255 }).notNull(),
        title: varchar({ length: 255 }).notNull(),
        description: text().notNull(),
        body: text().notNull(),
        createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
        updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    },
    (table) => {
        return {
            idxPostAuthorId: index("idx_post_author_id").on(table.authorId),
            idxPostCreatedAt: index("idx_post_created_at").on(table.createdAt),
        }
    },
)

export const Comment = pgTable(
    "comments",
    {
        id: varchar({ length: 26 }).primaryKey(),
        postId: varchar("post_id", { length: 26 })
            .notNull()
            .references(() => Post.id, { onDelete: "cascade" }),
        authorId: varchar("author_id", { length: 26 })
            .notNull()
            .references(() => User.id, { onDelete: "cascade" }),
        body: varchar({ length: 2000 }).notNull(),
        createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
        updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    },
    (table) => {
        return {
            idxCommentPostId: index("idx_comment_post_id").on(table.postId),
            idxCommentAuthorId: index("idx_comment_author_id").on(
                table.authorId,
            ),
            idxCommentCreatedAt: index("idx_comment_created_at").on(
                table.createdAt,
            ),
        }
    },
)

export const Rating = pgTable(
    "ratings",
    {
        value: boolean().notNull(),
        userId: varchar("user_id", { length: 26 })
            .notNull()
            .references(() => User.id, { onDelete: "cascade" }),
        postId: varchar("post_id", { length: 26 })
            .notNull()
            .references(() => Post.id, { onDelete: "cascade" }),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.userId, table.postId] }),
            idxRatingUserId: index("idx_rating_user_id").on(table.userId),
            idxRatingPostId: index("idx_rating_post_id").on(table.postId),
        }
    },
)

export const Follow = pgTable(
    "follows",
    {
        followerId: varchar("follower_id", { length: 26 })
            .notNull()
            .references(() => User.id, { onDelete: "cascade" }),
        followedId: varchar("followed_id", { length: 26 })
            .notNull()
            .references(() => User.id, { onDelete: "cascade" }),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.followerId, table.followedId] }),
            idxFollowFollowerId: index("idx_follow_follower_id").on(
                table.followerId,
            ),
            idxFollowFollowedId: index("idx_follow_followed_id").on(
                table.followedId,
            ),
        }
    },
)

export const UserRelations = relations(User, ({ many }) => ({
    sessions: many(Session),
    posts: many(Post),
    comments: many(Comment),
    ratings: many(Rating),
    followers: many(Follow, {
        relationName: "followers",
    }),
    followings: many(Follow, {
        relationName: "followings",
    }),
}))

export const SessionRelations = relations(Session, ({ one }) => ({
    user: one(User, {
        fields: [Session.userId],
        references: [User.id],
    }),
}))

export const PostRelations = relations(Post, ({ one, many }) => ({
    author: one(User, {
        fields: [Post.authorId],
        references: [User.id],
    }),
    comments: many(Comment),
    ratings: many(Rating),
}))

export const CommentRelations = relations(Comment, ({ one }) => ({
    post: one(Post, {
        fields: [Comment.postId],
        references: [Post.id],
    }),
    author: one(User, {
        fields: [Comment.authorId],
        references: [User.id],
    }),
}))

export const RatingRelations = relations(Rating, ({ one }) => ({
    user: one(User, {
        fields: [Rating.userId],
        references: [User.id],
    }),
    post: one(Post, {
        fields: [Rating.postId],
        references: [Post.id],
    }),
}))

export const FollowRelations = relations(Follow, ({ one }) => ({
    follower: one(User, {
        fields: [Follow.followerId],
        references: [User.id],
    }),
    followed: one(User, {
        fields: [Follow.followedId],
        references: [User.id],
    }),
}))

export type User = typeof User.$inferSelect
export type Session = typeof Session.$inferSelect
export type Post = typeof Post.$inferSelect
export type Comment = typeof Comment.$inferSelect
export type Rating = typeof Rating.$inferSelect
export type Follow = typeof Follow.$inferSelect
