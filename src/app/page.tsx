"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Calendar, Clock, BellRing, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white/10 backdrop-blur-md dark:bg-gray-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          {/* Logo / Title */}
          <Link
            href="/"
            className="font-lobster text-3xl font-bold text-indigo-600 dark:text-indigo-400"
          >
            Kalender.
          </Link>

          {/* User / Auth */}
          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white py-20 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto grid items-center gap-12 px-6 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="mb-6 text-4xl leading-tight font-extrabold md:text-6xl">
              Jadwalkan Lebih{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-600 bg-clip-text text-transparent">
                Cepat & Mudah
              </span>{" "}
              dengan Kalender
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-lg text-gray-600 md:text-xl lg:mx-0 dark:text-gray-300">
              Hapus ribetnya atur jadwal meeting. Bagikan link Anda, biarkan
              orang lain pilih waktu yang pas, dan semuanya sinkron otomatis.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button size="lg" asChild>
                <Link href="/sign-up">Mulai Gratis</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/events">Lihat Demo</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 flex items-center gap-2">
                <CalendarDays className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-lg font-semibold">Jadwal Hari Ini</h3>
              </div>
              <div className="space-y-3">
                <div className="rounded-xl border bg-gray-50 p-4 text-left dark:border-gray-700 dark:bg-gray-800">
                  <p className="font-medium">Meeting Tim Marketing</p>
                  <p className="text-sm text-gray-500">10:00 - 11:00</p>
                </div>
                <div className="rounded-xl border bg-gray-50 p-4 text-left dark:border-gray-700 dark:bg-gray-800">
                  <p className="font-medium">Client Presentation</p>
                  <p className="text-sm text-gray-500">13:00 - 14:30</p>
                </div>
                <div className="rounded-xl border bg-gray-50 p-4 text-left dark:border-gray-700 dark:bg-gray-800">
                  <p className="font-medium">1-on-1 Review</p>
                  <p className="text-sm text-gray-500">16:00 - 16:30</p>
                </div>
              </div>
            </div>

            {/* Gradient glow effect */}
            <div className="absolute -top-10 -right-10 h-40 w-40 animate-pulse rounded-full bg-indigo-500/30 blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 dark:bg-gray-950">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-12 text-3xl font-bold md:text-4xl">
            Fitur Unggulan
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl border bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <Calendar className="mx-auto mb-4 h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              <h3 className="mb-2 text-xl font-semibold">Jadwal Instan</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Pilih waktu yang tersedia, bagikan tautan, dan biarkan orang
                lain menjadwalkan dalam hitungan detik.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl border bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <Clock className="mx-auto mb-4 h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              <h3 className="mb-2 text-xl font-semibold">Integrasi Kalender</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sinkronisasi dengan Google Calendar, Outlook, dan lainnya agar
                jadwal selalu up-to-date.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl border bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <BellRing className="mx-auto mb-4 h-12 w-12 text-amber-600 dark:text-amber-400" />
              <h3 className="mb-2 text-xl font-semibold">Pengingat Otomatis</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Kirim notifikasi otomatis agar tidak ada pertemuan yang
                terlewat.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-20 text-center text-white">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 text-3xl font-bold md:text-4xl"
          >
            Mulai Mengatur Waktu Anda Hari Ini
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 text-lg"
          >
            Daftar gratis dan nikmati kemudahan penjadwalan dengan Kalender.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button size="lg" variant="secondary" asChild>
              <Link href="/sign-up">Daftar Sekarang</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        <div className="flex items-center justify-center gap-2">
          <span>© {new Date().getFullYear()} Kalender</span>
        </div>
      </footer>
    </main>
  );
}
