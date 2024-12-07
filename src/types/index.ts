import { Timestamp } from "firebase/firestore";
import { Speaker } from "../components/Speakers";
import { EventSlot } from "../components/EventSchedule";


export interface Event {
    id: number | string;
    title: string;
    description?: string;
    date?: string | Timestamp;
    location?: string;
    author?: string;
    images?: string[];
    imageUrl?: string[] | string;
    events?: string;
}

export interface EventDetails {
    title: string;
    date: string;
    eventLocation: string;
  }

export interface UpcomingEventsRegistration {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    event: Event[];
}

export interface EventForServer {
    id: string;
    title: string;
    description: string;
    date: Timestamp;
    location: string;
    eventRoom: string;
    images: string[];
    author: string;
    parking: boolean;
    seats: string;
    snacks?: boolean;
    imageUrl?: string;
    imageUrls: string[];
    speakers?: Speaker[];
    schedule?: EventSlot[];
}

export interface RegistrationFormData {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    jobTitle: string;
    eventDetails: EventDetails;
    experience: string;
    notify: string;
    consent: boolean;
    interestedField: string;
    hopes: string;
    additionalInfo: string;
}

export interface PastEventDetailsProps {
    params: Promise<{
      id: string;
    }>;
  }

  export interface NewsItem {
    id: string;
    uniqueId?: string;
    category?: string;
    title: string;
    author?: string;
    images?: string[];
    description?: string;
    lastEdited?: Timestamp; 
  }