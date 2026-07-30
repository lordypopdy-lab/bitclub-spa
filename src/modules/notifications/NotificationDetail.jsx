import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCopy,
  FiShare2,
  FiTrash2,
} from "react-icons/fi";
import NotificationHeader from "./components/NotificationHeader.jsx";
import CategoryIcon from "./components/CategoryIcon.jsx";
import NotificationSkeleton from "./components/NotificationSkeleton.jsx";
import Highlight from "./components/Highlight.jsx";
import { useNotificationsStore } from "./hooks/useNotificationsStore.js";
import { categories, titleByKey } from "./data/mockData.js";
import { buildContent, contentToPlainText } from "./data/content.js";

const styleTag = `
@keyframes notifFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes notifShimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
@keyframes notifSlideOut { to { opacity: 0; transform: translateX(-24px); } }
`;

const splitDate = (d = "") => {
  const [date, time = ""] = String(d).split(" ");
  let pretty = time.slice(0, 5);
  const h = parseInt(time.slice(0, 2), 10);
  if (!isNaN(h)) {
    const ampm = h >= 12 ? "PM" : "AM";
    const hh = h % 12 === 0 ? 12 : h % 12;
    pretty = `${String(hh).padStart(2, "0")}:${time.slice(3, 5)} ${ampm}`;
  }
  return { date, time: pretty };
};

const Block = React.memo(({ b, q }) => {
  if (b.type === "h")
    return (
      <div
        style={{
          color: "#fff",
          fontSize: 15.5,
          fontWeight: 700,
          marginTop: 22,
          marginBottom: 8,
        }}
      >
        <Highlight text={b.text} query={q} />
      </div>
    );
  if (b.type === "ul")
    return (
      <ul
        style={{
          margin: "8px 0",
          paddingLeft: 20,
          color: "#c3c8cf",
          fontSize: 14,
          lineHeight: 1.75,
        }}
      >
        {b.items.map((t, i) => (
          <li key={i}>
            <Highlight text={t} query={q} />
          </li>
        ))}
      </ul>
    );
  if (b.type === "ol")
    return (
      <ol
        style={{
          margin: "8px 0",
          paddingLeft: 20,
          color: "#c3c8cf",
          fontSize: 14,
          lineHeight: 1.75,
        }}
      >
        {b.items.map((t, i) => (
          <li key={i}>
            <Highlight text={t} query={q} />
          </li>
        ))}
      </ol>
    );
  if (b.type === "link")
    return (
      <a
        href={b.href}
        style={{
          color: "#22c1c3",
          fontSize: 14,
          textDecoration: "none",
          display: "inline-block",
          marginTop: 14,
          wordBreak: "break-word",
        }}
      >
        {b.text}
      </a>
    );
  return (
    <p
      style={{
        color: "#c3c8cf",
        fontSize: 14,
        lineHeight: 1.8,
        margin: "10px 0",
        wordBreak: "break-word",
      }}
    >
      <Highlight text={b.text} query={q} />
    </p>
  );
});

const NotificationDetail = () => {
  const { category, id } = useParams({ strict: false });
  const search = useSearchParams({ strict: false }) || {};
  const q = search.q || "";
  const navigate = useNavigate();
  const store = useNotificationsStore();

  const [loading, setLoading] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [toast, setToast] = useState("");
  const touch = useRef(null);
  const scrollRef = useRef(null);

  const items = store.state[category]?.items || [];
  const index = items.findIndex((n) => n.id === id);
  const item = index >= 0 ? items[index] : null;
  const cat = categories.find((c) => c.key === category);
  const title = titleByKey[category] || "Notification";

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 320);
    return () => clearTimeout(t);
  }, [id]);

  useEffect(() => {
    if (item && !item.read) store.markRead(category, item.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, id, item?.read]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [id]);

  const content = useMemo(
    () => (item ? buildContent(item, category) : []),
    [item, category],
  );
  const prev = index > 0 ? items[index - 1] : null;
  const next = index >= 0 && index < items.length - 1 ? items[index + 1] : null;
  const related = useMemo(
    () => items.filter((n) => n.id !== id).slice(0, 4),
    [items, id],
  );

  const go = useCallback(
    (n) => {
      if (!n) return;
      navigate(
        `/notifications/${category}/${n.id}${
          q ? `?q=${encodeURIComponent(q)}` : ""
        }`,
      );
    },
    [navigate, category, q],
  );

  const flash = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 1600);
  };

  const plain = () =>
    item ? `${item.title}\n\n${contentToPlainText(content)}` : "";

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(plain());
      flash("Copied to clipboard");
    } catch (e) {
      flash("Copy failed");
    }
  };

  const onShare = async () => {
    try {
      if (navigator.share)
        await navigator.share({ title: item.title, text: plain() });
      else await onCopy();
    } catch (e) {}
  };

  const onDelete = () => {
    setLeaving(true);
    setTimeout(() => {
      store.removeItem(category, id);
      navigate(cat?.path || "/notifications");
    }, 220);
  };

  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 70 && Math.abs(dy) < 50) go(dx < 0 ? next : prev);
  };

  const shell = (children) => (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        overflowX: "hidden",
      }}
    >
      <style>{styleTag}</style>
      <NotificationHeader
        title={title}
        onAction={item ? onShare : undefined}
        actionIcon={<FiShare2 size={18} />}
        fallback={cat?.path || "/notifications"}
      />
      {children}
    </div>
  );

  if (loading) return shell(<NotificationSkeleton />);

  if (!item)
    return shell(
      <div style={{ textAlign: "center", padding: "90px 24px" }}>
        <div style={{ color: "#7d828a", fontSize: 15 }}>
          Notification not found
        </div>
        <button
          onClick={() => navigate( cat?.path || "/notifications" )}
          style={{
            marginTop: 20,
            background: "#22c1c3",
            color: "#00181a",
            border: "none",
            borderRadius: 10,
            padding: "11px 26px",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          Back
        </button>
      </div>,
    );

  const { date, time } = splitDate(item.date);

  return shell(
    <div
      ref={scrollRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        animation: leaving
          ? "notifSlideOut 0.2s ease forwards"
          : "notifFadeIn 0.28s ease",
        padding: "4px 16px 40px",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          margin: "10px 0 14px",
        }}
      >
        <CategoryIcon
          name={cat?.icon || "bell"}
          color={cat?.iconColor || "#22c1c3"}
          size={15}
        />
        <span
          style={{
            background: "#12151a",
            color: "#9aa0a8",
            fontSize: 12,
            padding: "4px 10px",
            borderRadius: 999,
          }}
        >
          {title}
        </span>
      </div>

      <h1
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: 700,
          lineHeight: 1.4,
          margin: 0,
          wordBreak: "break-word",
        }}
      >
        <Highlight text={item.title} query={q} />
      </h1>

      <div style={{ color: "#5e636b", fontSize: 12.5, marginTop: 10 }}>
        Published {date} · {time}
      </div>

      <div style={{ height: 1, background: "#16191d", margin: "16px 0 4px" }} />

      {content.map((b, i) => (
        <Block key={i} b={b} q={q} />
      ))}

      <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
        <button
          onClick={onCopy}
          style={{
            flex: 1,
            minWidth: 0,
            background: "#12151a",
            color: "#c3c8cf",
            border: "1px solid #1d2126",
            borderRadius: 10,
            padding: "11px 0",
            fontSize: 13.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
          }}
        >
          <FiCopy size={15} /> Copy
        </button>
        <button
          onClick={onShare}
          style={{
            flex: 1,
            minWidth: 0,
            background: "#12151a",
            color: "#c3c8cf",
            border: "1px solid #1d2126",
            borderRadius: 10,
            padding: "11px 0",
            fontSize: 13.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
          }}
        >
          <FiShare2 size={15} /> Share
        </button>
        <button
          onClick={onDelete}
          style={{
            flex: 1,
            minWidth: 0,
            background: "#12151a",
            color: "#ef4444",
            border: "1px solid #1d2126",
            borderRadius: 10,
            padding: "11px 0",
            fontSize: 13.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
          }}
        >
          <FiTrash2 size={15} /> Delete
        </button>
      </div>

      {(prev || next) && (
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button
            disabled={!prev}
            onClick={() => go(prev)}
            style={{
              flex: 1,
              minWidth: 0,
              textAlign: "left",
              background: "#0c0d10",
              border: "1px solid #16191d",
              borderRadius: 12,
              padding: "12px",
              opacity: prev ? 1 : 0.35,
            }}
          >
            <div
              style={{
                color: "#5e636b",
                fontSize: 11.5,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <FiChevronLeft size={13} /> Previous
            </div>
            <div
              style={{
                color: "#c3c8cf",
                fontSize: 13,
                marginTop: 5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {prev ? prev.title : "—"}
            </div>
          </button>
          <button
            disabled={!next}
            onClick={() => go(next)}
            style={{
              flex: 1,
              minWidth: 0,
              textAlign: "right",
              background: "#0c0d10",
              border: "1px solid #16191d",
              borderRadius: 12,
              padding: "12px",
              opacity: next ? 1 : 0.35,
            }}
          >
            <div
              style={{
                color: "#5e636b",
                fontSize: 11.5,
                display: "flex",
                alignItems: "center",
                gap: 4,
                justifyContent: "flex-end",
              }}
            >
              Next <FiChevronRight size={13} />
            </div>
            <div
              style={{
                color: "#c3c8cf",
                fontSize: 13,
                marginTop: 5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {next ? next.title : "—"}
            </div>
          </button>
        </div>
      )}

      {related.length > 0 && (
        <div style={{ marginTop: 28 }}>
          <div
            style={{
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            Related notifications
          </div>
          {related.map((n) => (
            <Link
              key={n.id}
              to="/notifications/$category/$id"
              params={{ category, id: n.id }}
              style={{
                textDecoration: "none",
                display: "block",
                padding: "12px 0",
                borderBottom: "1px solid #101317",
              }}
            >
              <div
                style={{
                  color: "#d7dbe0",
                  fontSize: 13.5,
                  lineHeight: 1.4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {n.title}
              </div>
              <div style={{ color: "#5e636b", fontSize: 12, marginTop: 5 }}>
                {n.date}
              </div>
            </Link>
          ))}
        </div>
      )}

      {toast && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: 40,
            transform: "translateX(-50%)",
            background: "#1a1d22",
            color: "#fff",
            fontSize: 13,
            padding: "10px 18px",
            borderRadius: 999,
            zIndex: 90,
            animation: "notifFadeIn 0.2s ease",
          }}
        >
          {toast}
        </div>
      )}
    </div>,
  );
};

export default NotificationDetail;
