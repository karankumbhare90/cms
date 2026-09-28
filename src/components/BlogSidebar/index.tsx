import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type BlogSidebarProps = {
  blogSettings: any
  posts: any[]
  categories: any[]
  tags: string[]
  parentSlug: string
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({
  blogSettings,
  posts,
  categories,
  tags,
  parentSlug,
}) => {
  const hideRecentPost = blogSettings?.hideRecentPost || false
  const hideCategories = blogSettings?.hideCategories || false
  const hideTabs = blogSettings?.hideTabs || false

  if (hideRecentPost && hideCategories && hideTabs) {
    return null
  }

  return (
    <div className="col-span-1 lg:col-span-4 space-y-8">
      {/* Recent Posts Widget */}
      {!hideRecentPost && (
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h3 className="text-xl font-bold mb-4 border-b pb-2">Recent Posts</h3>
          <div className="space-y-4">
            {posts.slice(0, 3).map((post) => (
              <div key={post.id} className="flex gap-4">
                {post.blogMainImage &&
                  typeof post.blogMainImage === 'object' &&
                  post.blogMainImage.url && (
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={post.blogMainImage.url}
                        alt="thumbnail"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                <div>
                  <Link href={`/${parentSlug}/post/${post.slug}`}>
                    <h4 className="font-semibold text-sm hover:text-blue-600 line-clamp-2">
                      {post.blogTitle || post.title}
                    </h4>
                  </Link>
                  <span className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Widget */}
      {!hideCategories && (
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h3 className="text-xl font-bold mb-4 border-b pb-2">Categories</h3>
          <ul className="space-y-2">
            {categories.map((category: any) => (
              <li key={category.id}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-gray-600 hover:text-blue-600 transition text-sm"
                >
                  {category.categoryName || category.title}
                </Link>
              </li>
            ))}
            {categories.length === 0 && (
              <li className="text-gray-500 text-sm">No categories found</li>
            )}
          </ul>
        </div>
      )}

      {/* Tags Widget */}
      {!hideTabs && (
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h3 className="text-xl font-bold mb-4 border-b pb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-white border px-3 py-1 rounded-full text-sm text-gray-600 hover:border-blue-500 hover:text-blue-500 cursor-pointer transition"
              >
                {tag}
              </span>
            ))}
            {tags.length === 0 && <span className="text-gray-500 text-sm">No tags found</span>}
          </div>
        </div>
      )}
    </div>
  )
}
