import { PrayerTimes, Coordinates, CalculationMethod, Madhab } from "adhan";

const RAMADAN_START = new Date("2026-02-18");

function formatTime(date) {
  return date.toLocaleTimeString("en-BD", {
    hour:     "2-digit",
    minute:   "2-digit",
    hour12:   false,
    timeZone: "Asia/Dhaka",
  });
}

// Returns 30 days of sehri & iftar and salah timing for given coordinates

export function getTimingsForDistrict(lat, lng) {
  const coordinates = new Coordinates(lat, lng);
  const params      = CalculationMethod.MuslimWorldLeague();
  params.madhab     = Madhab.Hanafi;

  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(RAMADAN_START);
    date.setDate(date.getDate() + i);
    const times = new PrayerTimes(coordinates, date, params);
    return {
      sehri:   formatTime(times.fajr),
      iftar:   formatTime(times.maghrib),
      fajr:    formatTime(times.fajr),
      dhuhr:   formatTime(times.dhuhr),
      asr:     formatTime(times.asr),
      maghrib: formatTime(times.maghrib),
      isha:    formatTime(times.isha),
    };
  });
}