import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ChevronRight, BookOpen, ArrowLeft, Share2, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const openBlogModal = (slug: string | null = null) => {
  window.dispatchEvent(new CustomEvent('open-blog-modal', { detail: slug }));
};

const BlogModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);

  // States for Blog List
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  // States for Single Post
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [loadingPost, setLoadingPost] = useState(false);

  useEffect(() => {
    const handleOpen = (e: any) => {
      setIsOpen(true);
      setCurrentSlug(e.detail);
      document.body.style.overflow = 'hidden';
      
      if (e.detail) {
         fetchSinglePost(e.detail);
      } else {
         fetchBlogList();
      }
    };

    window.addEventListener('open-blog-modal', handleOpen);
    return () => window.removeEventListener('open-blog-modal', handleOpen);
  }, []);

  const close = () => {
    setIsOpen(false);
    setCurrentSlug(null);
    document.body.style.overflow = 'auto';
  };

  const fetchBlogList = async () => {
    setLoadingList(true);
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (Array.isArray(data)) setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingList(false);
    }
  };

  const fetchSinglePost = async (slug: string) => {
    setLoadingPost(true);
    try {
      const res = await fetch(`/api/blogs/${slug}`);
      if (!res.ok) throw new Error('Blog not found');
      const data = await res.json();
      setSelectedPost(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPost(false);
    }
  };

  const handleShare = () => {
    if (!selectedPost) return;
    if (navigator.share) {
      navigator.share({
        title: selectedPost.title,
        text: selectedPost.description,
        url: window.location.href, // Sharing main URL as modal doesn't have unique URL
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
             onClick={close}
          />

          {/* Modal Container */}
          <motion.div 
             initial={{ opacity: 0, y: 50, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 20, scale: 0.95 }}
             transition={{ duration: 0.3 }}
             className="relative z-10 w-full max-w-5xl h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden mx-4"
          >
             {/* Header */}
             <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-white z-20">
                <div className="flex items-center gap-4">
                   {currentSlug && (
                     <button 
                       onClick={() => {
                          setCurrentSlug(null);
                          setSelectedPost(null);
                          if (blogs.length === 0) fetchBlogList();
                       }}
                       className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition"
                     >
                       <ArrowLeft size={20} />
                     </button>
                   )}
                   <h3 className="font-bold text-lg text-slate-800">
                      {currentSlug ? 'Article' : 'Market Insights'}
                   </h3>
                </div>
                <button onClick={close} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition">
                   <X size={24} />
                </button>
             </div>

             {/* Content Area */}
             <div className="flex-1 overflow-y-auto w-full bg-slate-50 relative pb-12">
                
                {/* 1. Show List if no slug */}
                {!currentSlug && (
                   <div className="p-8">
                      {loadingList ? (
                         <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
                         </div>
                      ) : blogs.length === 0 ? (
                         <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-700">No articles published yet</h3>
                         </div>
                      ) : (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {blogs.map((blog) => (
                               <article 
                                 key={blog.id} 
                                 className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 group flex flex-col"
                               >
                                 {blog.cover_image && (
                                   <div className="aspect-video w-full overflow-hidden relative cursor-pointer" onClick={() => { setCurrentSlug(blog.slug); fetchSinglePost(blog.slug); }}>
                                     <img src={`/uploads/${blog.cover_image}`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform" />
                                   </div>
                                 )}
                                 <div className="p-6 flex flex-col flex-grow">
                                   <div className="text-xs text-brand-600 font-medium mb-3 bg-brand-50 w-fit px-2 py-1 rounded">
                                     {new Date(blog.created_at).toLocaleDateString()}
                                   </div>
                                   <h2 
                                     onClick={() => { setCurrentSlug(blog.slug); fetchSinglePost(blog.slug); }}
                                     className="text-lg font-bold text-slate-900 mb-2 cursor-pointer hover:text-brand-600 transition"
                                   >
                                     {blog.title}
                                   </h2>
                                   <p className="text-slate-600 text-sm mb-4 line-clamp-2">{blog.description}</p>
                                   <button 
                                     onClick={() => { setCurrentSlug(blog.slug); fetchSinglePost(blog.slug); }}
                                     className="mt-auto text-brand-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all w-fit"
                                   >
                                     Read Article <ChevronRight size={16} />
                                   </button>
                                 </div>
                               </article>
                            ))}
                         </div>
                      )}
                   </div>
                )}

                {/* 2. Show Post if slug exists */}
                {currentSlug && (
                   <div className="bg-white w-full">
                      {loadingPost ? (
                         <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
                         </div>
                      ) : !selectedPost ? (
                         <div className="text-center py-20">
                            <h2 className="text-xl font-bold">Article not found</h2>
                         </div>
                      ) : (
                         <div className="max-w-4xl mx-auto px-6 py-12">
                            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">{selectedPost.title}</h1>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-10 pb-6 border-b border-slate-100">
                               <div className="font-bold text-slate-800">Karan Vijayvargiya</div>
                               <div className="flex items-center gap-1"><Calendar size={14} className="text-brand-600"/> {new Date(selectedPost.created_at).toLocaleDateString()}</div>
                               <button onClick={handleShare} className="flex items-center gap-1 hover:text-brand-600 ml-auto border px-3 py-1.5 rounded-full"><Share2 size={14} /> Share</button>
                            </div>

                            {selectedPost.cover_image && (
                              <div className="mb-12 rounded-2xl overflow-hidden text-center bg-slate-50">
                                <img src={`/uploads/${selectedPost.cover_image}`} className="w-full h-auto max-h-[500px] object-contain mx-auto" />
                              </div>
                            )}

                            <div className="markdown-body prose prose-lg prose-brand max-w-none">
                              <style>{`
                                .markdown-body h2 { font-size: 1.875rem; margin-top: 2rem; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; font-weight: bold;}
                                .markdown-body h3 { font-size: 1.5rem; margin-top: 1.5rem; margin-bottom: 0.75rem; font-weight: bold;}
                                .markdown-body p { margin-bottom: 1.25rem; line-height: 1.8; color: #334155; }
                                .markdown-body ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
                                .markdown-body img { border-radius: 1rem; margin: 2rem 0; width: 100%; height: auto; display: block; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
                                .markdown-body blockquote { border-left: 4px solid #2563eb; padding-left: 1rem; font-style: italic; color: #475569; background: #f8fafc; padding: 1rem; border-radius: 0 0.5rem 0.5rem 0; }
                                .markdown-body strong { color: #0f172a; font-weight: 700; }
                              `}</style>
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {selectedPost.content}
                              </ReactMarkdown>
                            </div>

                            {selectedPost.seo_keywords && (
                              <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
                                <Tag size={16} className="text-slate-400 mt-1" />
                                {selectedPost.seo_keywords.split(',').map((k: string, i: number) => (
                                  <span key={i} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">{k.trim()}</span>
                                ))}
                              </div>
                            )}
                         </div>
                      )}
                   </div>
                )}
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BlogModal;
