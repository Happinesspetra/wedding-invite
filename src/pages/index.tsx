import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {
  MapPin,
  Moon,
  Sun,
  Music,
  VolumeX,
  PartyPopper,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

const Countdown = dynamic(() => import('react-countdown'), { ssr: false });

export default function WeddingInvite() {
  const [page, setPage] = useState('home');
  const weddingDate = new Date('2025-06-15T00:00:00');
  const [darkMode, setDarkMode] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [rsvp, setRsvp] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    attending: '',
    guest: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const newAudio = new Audio('/wedding-music.mp3');
    newAudio.loop = true;
    setAudio(newAudio);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const toggleMusic = () => {
    if (!audio) return;
    musicPlaying ? audio.pause() : audio.play();
    setMusicPlaying(!musicPlaying);
  };

  const handleChange = (e) =>
    setRsvp({ ...rsvp, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addDoc(collection(db, 'rsvps'), rsvp);
    setSubmitted(true);
    setRsvp({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      attending: '',
      guest: '',
    });
    setLoading(false);
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-500 ${
        darkMode ? 'text-white' : 'text-gray-900'
      } bg-fixed bg-[url('/wedding-bg.jpg')] bg-cover bg-center bg-no-repeat`}
    >
      <Head>
        <title>Berry & Nnaemeka's Wedding</title>
        <meta
          name="description"
          content="You're cordially invited to our wedding celebration!"
        />
      </Head>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute top-4 right-4 flex gap-3 z-10">
        <button
          onClick={toggleMusic}
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
        >
          {musicPlaying ? <VolumeX /> : <Music />}
        </button>
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
        >
          {darkMode ? <Sun /> : <Moon />}
        </button>
      </div>

      {page === 'home' && (
        <div className="relative z-10 text-center">
          <motion.h1
            className="text-5xl font-extrabold mb-4"
            animate={{ opacity: [0, 1], y: [-20, 0] }}
          >
            Berry & Nnaemeka
          </motion.h1>

          {isClient && (
            <Countdown date={weddingDate} className="text-3xl font-bold mt-4" />
          )}

          <div className="mt-6 text-lg font-medium">
            <p className="font-semibold">
              The Families of Michael Umoekpe Effiong <br />
              And Late Edidiong Isong Ekon Of Ibiono, <br />
              both in Oron Local Government Area of Akwa Ibom State <br />
              Cordially invite YOU to the traditional marriage of their
              children <br />- Ms. Joy Umoekpe & Dr. James Isong
            </p>
            <p className="text-lg font-semibold">Join us on June 15, 2025</p>
          </div>

          <div className="mt-6 text-lg font-medium flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4 text-center">
            <span className="flex items-center gap-1">
              <MapPin className="inline" />
              <a
                href="https://www.google.com/maps/place/Kubwa,+Abuja"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Kubwa, Abuja Nigeria
              </a>
            </span>
            <h6>📅 20th April, 2025</h6>
            <h6>⏰ 10am</h6>
            <p>
              🎉 Reception at Dr. Michael Umoekpe Effiong’s compound, Eyoabasi
              at 2pm
            </p>
            <p>
              🎨 Colours of the day:{' '}
              <span className="font-bold">Champagne Gold & White</span>
            </p>
          </div>

          <button
            onClick={() => setPage('love-note')}
            className="mt-6 px-6 py-2 bg-pink-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2"
          >
            Read Our Love Note <ArrowRight />
          </button>
        </div>
      )}

      {page === 'love-note' && (
        <div className="relative z-10 text-center max-w-lg">
          <h1 className="text-4xl font-bold">A Love Note from Us 🌿</h1>
          <p className="mt-4 text-lg">
            To Our Dearest Friends and Family,
            <br />
            <br />
            From the moment our paths crossed, we knew our love story was meant
            to be written together. Through laughter, adventures, quiet
            moments, and endless dreams, we have found in each other a love
            that feels like home.
            <br />
            <br />
            With hearts overflowing, we invite you to join us as we say “I do”
            to forever. Your presence will make our day even more magical, and
            we cannot wait to create beautiful memories together.
            <br />
            <br />
            As we step into this new chapter of our lives, we are filled with
            gratitude for the love and support that surround us. Our wedding is
            not just about us; it is a celebration of love, resilience, family,
            and friendship, and we cannot imagine this day without YOU.
            <br />
            <br />
            With Love ❤️,
            <br />
            <span className="text-xl font-semibold">Joy & James</span>
          </p>
          <img
            src="/wedding-couples.jpg"
            alt="Wedding Couple"
            className="w-64 mt-6 rounded-lg shadow-lg mx-auto"
          />
          <button
            onClick={() => setPage('rsvp')}
            className="mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2"
          >
            Proceed to RSVP <ArrowRight />
          </button>
          <button
            onClick={() => setPage('home')}
            className="mt-3 px-6 py-2 bg-gray-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2"
          >
            <ArrowLeft /> Back to Home
          </button>
        </div>
      )}

      {page === 'rsvp' && (
        <motion.div className="relative z-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center">Kindly RSVP your invite</h2>
          {submitted ? (
            <div className="mt-4 text-green-500 text-center">
              <PartyPopper size={40} className="mx-auto" />
              <p className="mt-2 text-xl font-semibold">
                Thank you for your RSVP!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                className="w-full p-2 border rounded"
                value={rsvp.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                className="w-full p-2 border rounded"
                value={rsvp.lastName}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full p-2 border rounded"
                value={rsvp.phone}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full p-2 border rounded"
                value={rsvp.email}
                onChange={handleChange}
              />
              <label className="block text-sm font-semibold">
                Will you be attending?
              </label>
              <select
                name="attending"
                required
                className="w-full p-2 border rounded"
                value={rsvp.attending}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              <label className="block text-sm font-semibold">
                Will you bring a guest?
              </label>
              <select
                name="guest"
                required
                className="w-full p-2 border rounded"
                value={rsvp.guest}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              <button
                type="submit"
                className="w-full p-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-lg shadow-lg"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          )}
          <button
            onClick={() => setPage('love-note')}
            className="mt-6 px-6 py-2 bg-gray-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2"
          >
            <ArrowLeft /> Back
          </button>
        </motion.div>
      )}
    </div>
  );
}
