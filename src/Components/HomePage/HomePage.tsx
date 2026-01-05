import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TravelHero.module.css";

import collage from "./img/travel-1.jpeg";

type Tab = "Stays" | "Cars" | "Experiences" | "RealEstates" | "Flights";

type DayCell = {
  date: Date;
  inMonth: boolean;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, delta: number) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}

function monthLabel(d: Date) {
  return d.toLocaleString(undefined, { month: "long", year: "numeric" });
}

function buildMonthGrid(monthStart: Date): DayCell[] {
  const first = startOfMonth(monthStart);
  const start = new Date(first);
  const weekday = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - weekday);

  const cells: DayCell[] = [];
  for (let i = 0; i < 42; i++) {
    const cur = new Date(start);
    cur.setDate(start.getDate() + i);
    cells.push({
      date: cur,
      inMonth: cur.getMonth() === first.getMonth(),
    });
  }
  return cells;
}

function formatRange(a: Date | null, b: Date | null) {
  if (!a || !b) return "";
  const left = `${a.toLocaleString(undefined, { month: "short" })} ${pad2(
    a.getDate()
  )}`;
  const right = `${b.toLocaleString(undefined, { month: "short" })} ${pad2(
    b.getDate()
  )}`;
  return `${left} - ${right}`;
}

export default function HomePage() {
  const [tab, setTab] = useState<Tab>("Stays");
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("4 Guests");

  const [locationOpen, setLocationOpen] = useState(false);
  const locationWrapRef = useRef<HTMLDivElement | null>(null);
  const locationInputRef = useRef<HTMLInputElement | null>(null);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarWrapRef = useRef<HTMLDivElement | null>(null);

  const today = useMemo(() => new Date(), []);
  const [calendarBase, setCalendarBase] = useState(() => startOfMonth(today));

  const [startDate, setStartDate] = useState<Date | null>(new Date(2025, 8, 8));
  const [endDate, setEndDate] = useState<Date | null>(new Date(2025, 8, 19));

  const dateValue = useMemo(
    () => formatRange(startDate, endDate) || "Sep 08 - Sep 19",
    [startDate, endDate]
  );

  const suggestions = useMemo(
    () => [
      "Bangkok, Thailand",
      "Ueno, Taito, Tokyo",
      "Ikebukuro, Toshima, Tokyo",
      "San Diego, CA",
      "Humboldt Park, Chicago, IL",
    ],
    []
  );

  const filteredSuggestions = useMemo(() => {
    const q = location.trim().toLowerCase();
    if (!q) return suggestions;
    return suggestions.filter((s) => s.toLowerCase().includes(q));
  }, [location, suggestions]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        locationWrapRef.current &&
        !locationWrapRef.current.contains(target)
      ) {
        setLocationOpen(false);
      }
      if (
        calendarWrapRef.current &&
        !calendarWrapRef.current.contains(target)
      ) {
        setCalendarOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLocationOpen(false);
        setCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const openLocation = () => {
    setLocationOpen(true);
    setCalendarOpen(false);
    requestAnimationFrame(() => {
      locationInputRef.current?.focus();
      locationInputRef.current?.select();
    });
  };

  const pickLocation = (value: string) => {
    setLocation(value);
    setLocationOpen(false);
    requestAnimationFrame(() => locationInputRef.current?.blur());
  };

  const openCalendar = () => {
    setCalendarOpen(true);
    setLocationOpen(false);
  };

  const pickDate = (d: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(d);
      setEndDate(null);
      return;
    }

    if (startDate && !endDate) {
      if (d.getTime() < startDate.getTime()) {
        setEndDate(startDate);
        setStartDate(d);
      } else {
        setEndDate(d);
      }
    }
  };

  const inRange = (d: Date) => {
    if (!startDate) return false;
    if (startDate && !endDate) return sameDay(d, startDate);
    if (!endDate) return false;
    const t = d.getTime();
    return t >= startDate.getTime() && t <= endDate.getTime();
  };

  const isStart = (d: Date) => (startDate ? sameDay(d, startDate) : false);
  const isEnd = (d: Date) => (endDate ? sameDay(d, endDate) : false);

  const leftMonth = useMemo(() => buildMonthGrid(calendarBase), [calendarBase]);
  const rightMonth = useMemo(
    () => buildMonthGrid(addMonths(calendarBase, 1)),
    [calendarBase]
  );

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SEARCH:", {
      tab,
      location,
      startDate,
      endDate,
      guests,
    });
  };

  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <div className={styles.brand}>
          <div className={styles.logoMark} />
          <span className={styles.brandText}>.fis</span>
        </div>

        <div className={styles.navLeft}>
          <button className={styles.navSelect} type="button">
            Travelers <span className={styles.chev}>▾</span>
          </button>
        </div>

        <div className={styles.navRight}>
          <button className={styles.navSelect} type="button">
            Templates <span className={styles.chev}>▾</span>
          </button>

          <button
            className={styles.iconBtn}
            type="button"
            aria-label="Language"
          >
            🌐
          </button>
          <button className={styles.iconBtn} type="button" aria-label="Help">
            ⓘ
          </button>

          <button className={styles.primaryPill} type="button">
            List your property
          </button>

          <button
            className={styles.iconBtn}
            type="button"
            aria-label="Notifications"
          >
            🔔
          </button>

          <div className={styles.avatar} aria-label="Profile" />
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.left}>
          <h1 className={styles.h1}>
            Hotel, car,
            <br />
            experiences
          </h1>

          <p className={styles.lead}>
            With us, your trip is filled with amazing experiences.
          </p>

          <button className={styles.cta} type="button">
            Start your search
          </button>
        </section>

        <section className={styles.right} aria-label="Gallery">
          <div
            className={styles.collage}
            style={{ backgroundImage: `url(${collage})` }}
          />
        </section>

        <section className={styles.searchDock} aria-label="Search">
          <div className={styles.tabs}>
            {(
              [
                "Stays",
                "Cars",
                "Experiences",
                "RealEstates",
                "Flights",
              ] as Tab[]
            ).map((t) => (
              <button
                key={t}
                type="button"
                className={`${styles.tab} ${tab === t ? styles.tabActive : ""}`}
                onClick={() => setTab(t)}
              >
                <span className={styles.tabDot} />
                {t}
              </button>
            ))}
          </div>

          <form className={styles.searchBar} onSubmit={onSearch}>
            <div className={styles.locationWrap} ref={locationWrapRef}>
              <button
                type="button"
                className={styles.fieldButton}
                onClick={openLocation}
              >
                <div className={styles.field}>
                  <div className={styles.fieldHead}>
                    <span className={styles.fieldIcon}>📍</span>
                    <span className={styles.fieldTitle}>
                      {location ? location : "Location"}
                    </span>
                  </div>

                  <input
                    ref={locationInputRef}
                    className={styles.fieldInput}
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setLocationOpen(true);
                    }}
                    onFocus={() => setLocationOpen(true)}
                    placeholder="Where are you going?"
                    autoComplete="off"
                  />
                </div>
              </button>

              {locationOpen && (
                <div
                  className={styles.suggestPanel}
                  role="listbox"
                  aria-label="Suggested locations"
                >
                  <div className={styles.suggestTitle}>Suggested locations</div>

                  <div className={styles.suggestList}>
                    {filteredSuggestions.length === 0 ? (
                      <div className={styles.suggestEmpty}>No results</div>
                    ) : (
                      filteredSuggestions.map((item) => (
                        <button
                          key={item}
                          type="button"
                          className={styles.suggestItem}
                          onClick={() => pickLocation(item)}
                          role="option"
                        >
                          <span className={styles.suggestIcon}>🏛️</span>
                          <span className={styles.suggestText}>{item}</span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.vline} />

            <div className={styles.calendarWrap} ref={calendarWrapRef}>
              <button
                type="button"
                className={styles.fieldButton}
                onClick={openCalendar}
              >
                <div className={styles.field}>
                  <div className={styles.fieldHead}>
                    <span className={styles.fieldIcon}>📅</span>
                    <span className={styles.fieldTitle}>{dateValue}</span>
                  </div>
                  <div className={styles.fieldHint}>Check in - Check out</div>
                </div>
              </button>

              {calendarOpen && (
                <div className={styles.calendarPanel} aria-label="Calendar">
                  <div className={styles.calendarInner}>
                    <div className={styles.calendarMonth}>
                      <div className={styles.calendarHeader}>
                        <button
                          type="button"
                          className={styles.calArrow}
                          onClick={() =>
                            setCalendarBase((d) => addMonths(d, -1))
                          }
                          aria-label="Previous month"
                        >
                          ‹
                        </button>
                        <div className={styles.calTitle}>
                          {monthLabel(calendarBase)}
                        </div>
                        <div className={styles.calArrowSpacer} />
                      </div>

                      <div className={styles.calWeek}>
                        <span>Su</span>
                        <span>Mo</span>
                        <span>Tu</span>
                        <span>We</span>
                        <span>Th</span>
                        <span>Fr</span>
                        <span>Sa</span>
                      </div>

                      <div className={styles.calGrid}>
                        {leftMonth.map((c) => {
                          const cls = [
                            styles.calDay,
                            !c.inMonth ? styles.calDayMuted : "",
                            inRange(c.date) ? styles.calDayInRange : "",
                            isStart(c.date) ? styles.calDayStart : "",
                            isEnd(c.date) ? styles.calDayEnd : "",
                          ].join(" ");
                          return (
                            <button
                              key={`${c.date.toISOString()}-l`}
                              type="button"
                              className={cls}
                              onClick={() => pickDate(c.date)}
                            >
                              {c.date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className={styles.calendarMonth}>
                      <div className={styles.calendarHeader}>
                        <div className={styles.calArrowSpacer} />
                        <div className={styles.calTitle}>
                          {monthLabel(addMonths(calendarBase, 1))}
                        </div>
                        <button
                          type="button"
                          className={styles.calArrow}
                          onClick={() =>
                            setCalendarBase((d) => addMonths(d, 1))
                          }
                          aria-label="Next month"
                        >
                          ›
                        </button>
                      </div>

                      <div className={styles.calWeek}>
                        <span>Su</span>
                        <span>Mo</span>
                        <span>Tu</span>
                        <span>We</span>
                        <span>Th</span>
                        <span>Fr</span>
                        <span>Sa</span>
                      </div>

                      <div className={styles.calGrid}>
                        {rightMonth.map((c) => {
                          const cls = [
                            styles.calDay,
                            !c.inMonth ? styles.calDayMuted : "",
                            inRange(c.date) ? styles.calDayInRange : "",
                            isStart(c.date) ? styles.calDayStart : "",
                            isEnd(c.date) ? styles.calDayEnd : "",
                          ].join(" ");
                          return (
                            <button
                              key={`${c.date.toISOString()}-r`}
                              type="button"
                              className={cls}
                              onClick={() => pickDate(c.date)}
                            >
                              {c.date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.vline} />

            <div className={styles.field}>
              <div className={styles.fieldHead}>
                <span className={styles.fieldIcon}>👤</span>
                <span className={styles.fieldTitle}>{guests}</span>
              </div>
              <input
                className={styles.fieldInput}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder="Guests"
              />
            </div>

            <button
              className={styles.searchBtn}
              type="submit"
              aria-label="Search"
            >
              🔍
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
