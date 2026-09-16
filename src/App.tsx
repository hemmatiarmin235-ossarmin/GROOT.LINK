import { useState, useEffect } from 'react'

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    setIsVisible(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  const features = [
    { icon: '🚀', title: 'سرعت بالا', description: 'طراحی مدرن و سریع با آخرین تکنولوژی‌ها' },
    { icon: '🎨', title: 'طراحی زیبا', description: 'رابط کاربری جذاب و کاربرپسند' },
    { icon: '📱', title: 'واکنش‌گرا', description: 'سازگار با تمام دستگاه‌ها و اندازه‌ها' },
    { icon: '🔒', title: 'امنیت بالا', description: 'محافظت از اطلاعات شما در اولویت ماست' },
    { icon: '💡', title: 'خلاقیت', description: 'ایده‌های نوآورانه برای حل مسائل' },
    { icon: '🌐', title: 'دسترسی جهانی', description: 'از هر نقطه‌ای در جهان قابل دسترسی' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans" dir="rtl">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ✨ خوش آمدید
          </div>
          <div className="hidden md:flex gap-8">
            {['خانه', 'ویژگی‌ها', 'درباره ما', 'تماس'].map((item) => (
              <button
                key={item}
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-400 hidden lg:block">
            {formatTime(currentTime)}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className={`text-center max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8 text-6xl md:text-8xl animate-bounce">
            👋
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              سلام!
            </span>
            <br />
            <span className="text-white">خوش آمدید</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            از بازدید شما خوشحالیم. اینجا جایی است که خلاقیت با تکنولوژی ملاقات می‌کند.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/30">
              شروع کنید 🚀
            </button>
            <button className="px-8 py-4 border border-white/30 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300">
              بیشتر بدانید
            </button>
          </div>
          <div className="mt-12 text-gray-400">
            <p className="text-lg">{formatDate(currentTime)}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            ویژگی‌های <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">برجسته</span>
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg">آنچه ما را متفاوت می‌کند</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '۱۰۰+', label: 'پروژه موفق' },
              { number: '۵۰+', label: 'مشتری راضی' },
              { number: '۹۹٪', label: 'رضایت‌مندی' },
              { number: '۲۴/۷', label: 'پشتیبانی' },
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            آماده شروع هستید؟
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            همین حالا با ما همراه شوید و تجربه‌ای متفاوت داشته باشید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="ایمیل خود را وارد کنید..."
              className="px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 w-full sm:w-80 text-right"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/30 whitespace-nowrap">
              عضویت رایگان ✉️
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                درباره ما
              </h3>
              <p className="text-gray-400 leading-relaxed">
                ما تیمی از متخصصان هستیم که با عشق و تعهد، بهترین خدمات را ارائه می‌دهیم.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">لینک‌های مفید</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">صفحه اصلی</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">خدمات ما</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">نمونه کارها</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">تماس با ما</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">ارتباط با ما</h3>
              <div className="flex gap-4">
                {['📧', '📱', '💬', '🌐'].map((icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl hover:bg-purple-500/30 hover:scale-110 transition-all duration-300">
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-500">
            <p>© ۱۴۰۵ - تمامی حقوق محفوظ است ❤️</p>
          </div>
        </div>
      </footer>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default App
