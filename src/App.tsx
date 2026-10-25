import { useEffect, useMemo, useState } from "react";

type ToastType = "success" | "error" | "info" | "warning";

type ToastState = {
  id: number;
  type: ToastType;
  message: string;
};

const dashboardCards = [
  {
    icon: "📡",
    title: "اشتراک‌گذاری سریع",
    description: "ارسال متن، لینک یا فایل بین دستگاه‌های نزدیک",
    tone: "blue",
  },
  {
    icon: "📲",
    title: "دریافت فایل",
    description: "پذیرش اعلان و دریافت داده‌ها بدون سرور",
    tone: "cyan",
  },
  {
    icon: "🧾",
    title: "تاریخچه",
    description: "مشاهده آخرین انتقال‌ها و فایل‌های دریافت‌شده",
    tone: "purple",
  },
  {
    icon: "🔐",
    title: "حریم خصوصی",
    description: "اتصال مستقیم و امن بدون آپلود به سرور",
    tone: "green",
  },
  {
    icon: "📊",
    title: "دیباگ",
    description: "بررسی وضعیت اتصال و کیفیت شبکه",
    tone: "orange",
  },
  {
    icon: "⚡",
    title: "دستورات سریع",
    description: "دسترسی سریع به گزینه‌های اصلی با Command Palette",
    tone: "pink",
  },
];

const commandItems = [
  { icon: "🔗", label: "ایجاد اتصال جدید" },
  { icon: "📤", label: "اشتراک‌گذاری فایل" },
  { icon: "📥", label: "دریافت فایل" },
  { icon: "🕘", label: "نمایش تاریخچه" },
  { icon: "⚙️", label: "تنظیمات" },
  { icon: "🧪", label: "اجرای تست اتصال" },
];

const historyItems = [
  { icon: "🧾", name: "فایل PDF", meta: "دیروز • 2.4 MB" },
  { icon: "📸", name: "عکس تیم", meta: "دیروز • 580 KB" },
  { icon: "🔗", name: "لینک صفحه پروژه", meta: "امروز • متن" },
  { icon: "💬", name: "پیام کوتاه", meta: "امروز • 418 بایت" },
];

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [connectionState, setConnectionState] = useState<"disconnected" | "connecting" | "connected">("connecting");
  const [deviceName, setDeviceName] = useState("Galaxy S24");
  const [activeTab, setActiveTab] = useState<"share" | "receive">("share");
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState(0);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [dropZoneActive, setDropZoneActive] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setConnectionState("connected"), 1200);
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsCommandOpen((current) => !current);
      }
      if (event.key === "Escape") {
        setIsCommandOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const statusText = useMemo(() => {
    if (connectionState === "connected") return "متصل";
    if (connectionState === "connecting") return "در حال اتصال";
    return "قطع شده";
  }, [connectionState]);

  const showToast = (type: ToastType, message: string) => {
    setToast({ id: Date.now(), type, message });
  };

  const handleCopySignal = async () => {
    const payload = "wss://local-share.example/signal/2e41a8d9";
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(payload);
      }
      showToast("success", "کد اتصال کپی شد");
    } catch {
      showToast("error", "کپی انجام نشد، لطفاً مجدداً تلاش کنید");
    }
  };

  const handleDropZoneClick = () => {
    showToast("info", "انتخاب فایل برای اشتراک‌گذاری");
  };

  return (
    <div className={`app-shell ${theme}`} data-theme={theme}>
      <header className="header">
        <div className="header-inner">
          <div className="logo-section">
            <div className="logo-icon">📡</div>
            <div className="logo-text">
              <h1>LOCAL SHARE</h1>
              <p>اشتراک‌گذاری امن و سریع</p>
            </div>
          </div>

          <div className="header-status">
            <div className={`connection-badge ${connectionState}`}>
              <span className="status-dot" />
              {statusText}
            </div>

            <button className="device-name" onClick={() => setDeviceName((current) => current === "Galaxy S24" ? "MacBook Pro" : "Galaxy S24")}>
              {deviceName}
            </button>

            <div className="header-actions">
              <button className="icon-btn" onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}>
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
              <button className="icon-btn" onClick={() => setIsCommandOpen(true)}>
                ⌘
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="dashboard-grid">
          {dashboardCards.map((card) => (
            <div
              key={card.title}
              className="dash-card"
              onClick={() => showToast("info", card.title)}
            >
              <div className={`dash-card-icon ${card.tone}`}>{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </section>

        <section className="drop-zone ${dropZoneActive ? 'drag-over' : ''}" onClick={handleDropZoneClick}>
          <div className="drop-zone-icon">📦</div>
          <h3>فایل یا متن را برای اشتراک‌گذاری بکشید یا اینجا کلیک کنید</h3>
          <p>بدون سرور، بدون آپلود، فقط با اتصال مستقیم دستگاه‌ها</p>
          <button className="btn btn-primary" onClick={(event) => { event.stopPropagation(); showToast("success", "اتصال آماده است"); }}>
            شروع اشتراک‌گذاری
          </button>
        </section>

        <section className="panel">
          <div className="tabs">
            <button className={`tab ${activeTab === "share" ? "active" : ""}`} onClick={() => setActiveTab("share")}>
              اشتراک‌گذاری
            </button>
            <button className={`tab ${activeTab === "receive" ? "active" : ""}`} onClick={() => setActiveTab("receive")}>
              دریافت
            </button>
          </div>

          {activeTab === "share" ? (
            <div className="share-panel">
              <div className="step-indicator">
                <div className="step-number">1</div>
                <div className="step-text">دستگاه را به‌عنوان میزبان وصل کنید</div>
              </div>

              <div className="signaling-data">wss://local-share.example/signal/2e41a8d9</div>

              <div className="qr-container">
                <div className="qr-code">QR</div>
                <button className="btn btn-secondary" onClick={handleCopySignal}>کپی کد اتصال</button>
              </div>
            </div>
          ) : (
            <div className="receive-panel">
              <div className="step-indicator">
                <div className="step-number">1</div>
                <div className="step-text">کد اتصال را وارد کنید</div>
              </div>

              <div className="form-group">
                <label className="form-label">کد اتصال</label>
                <input className="form-input" value="2e41a8d9" readOnly />
              </div>

              <div className="form-group">
                <label className="form-label">نام دستگاه</label>
                <input className="form-input" value={deviceName} onChange={(event) => setDeviceName(event.target.value)} />
              </div>

              <button className="btn btn-primary" onClick={() => showToast("success", "اتصال برقرار شد")}>اتصال</button>
            </div>
          )}
        </section>

        <section className="bottom-grid">
          <div className="panel">
            <h3 className="panel-title">تاریخچه</h3>
            {historyItems.map((item) => (
              <div className="history-item" key={item.name}>
                <div className="history-icon">{item.icon}</div>
                <div className="history-info">
                  <div className="history-name">{item.name}</div>
                  <div className="history-meta">{item.meta}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="panel">
            <h3 className="panel-title">وضعیت سیستم</h3>
            <div className="diag-item">
              <span className="diag-label">WebRTC</span>
              <span className="diag-value yes">فعال</span>
            </div>
            <div className="diag-item">
              <span className="diag-label">بلوک‌کننده مرورگر</span>
              <span className="diag-value no">خیر</span>
            </div>
            <div className="diag-item">
              <span className="diag-label">اتصال هم‌زمان</span>
              <span className="diag-value connected">{statusText}</span>
            </div>
            <div className="diag-item">
              <span className="diag-label">حالت شب</span>
              <span className="diag-value">{theme === "dark" ? "روشن" : "خاموش"}</span>
            </div>
          </div>
        </section>
      </main>

      {isCommandOpen && (
        <div className="command-palette active" onClick={() => setIsCommandOpen(false)}>
          <div className="command-box" onClick={(event) => event.stopPropagation()}>
            <input
              className="command-input"
              autoFocus
              placeholder="دستور موردنظر را جستجو کنید..."
              value=""
              onChange={() => undefined}
            />
            <div className="command-list">
              {commandItems.map((item, index) => (
                <div
                  key={item.label}
                  className={`command-item ${selectedCommand === index ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedCommand(index);
                    setIsCommandOpen(false);
                    showToast("info", item.label);
                  }}
                >
                  <span className="command-item-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            <span className="toast-icon">{toast.type === "success" ? "✅" : toast.type === "error" ? "❌" : toast.type === "warning" ? "⚠️" : "ℹ️"}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
