import { useState, useEffect } from "react";
import { schoolApi } from "@/api/schoolApi";

// Default fallback values if DB is empty
const DEFAULTS = {
  school_name: "Daudi International School",
  tagline: "Muzaffarpur, Bihar — Non-Profit English Medium School",
  hero_badge: "Admissions Open 2026–27",
  hero_description: "Empowering young minds with quality education, strong values, and a vision for a brighter tomorrow — under the Daudi Welfare Trust.",
  founder_quote: "Education is the most powerful weapon which you can use to change the world. At Daudi International School, we believe every child deserves a chance to rise.",
  address: "Shafi Manzil, Daudi Market, Motijheel, Muzaffarpur, Bihar 842001",
  phone: "+91 621 224 3314",
  email: "daudischool.muz@gmail.com",
  facebook_url: "https://www.facebook.com/p/Daudi-International-School-Muzaffarpur-100072254675605/",
  youtube_url: "https://www.youtube.com/@altamashdaudi7099",
};

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    schoolApi.resources.SchoolSettings.list().then((records) => {
      const map = { ...DEFAULTS };
      records.forEach((r) => { if (r.key) map[r.key] = r.value; });
      setSettings(map);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return { settings, loading };
}

export function useStats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    schoolApi.resources.Stat.list("sort_order").then((records) => {
      setStats(records);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return { stats, loading };
}

export function useEvents(status = null) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = status
      ? schoolApi.resources.Event.filter({ status })
      : schoolApi.resources.Event.list("-date");
    fetch.then((records) => {
      setEvents(records);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [status]);

  return { events, loading };
}

export function useGalleryPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    schoolApi.resources.GalleryPhoto.list("sort_order").then((records) => {
      setPhotos(records);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return { photos, loading };
}