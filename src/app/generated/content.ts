export interface Blog {
  title: string;
  brief: string;
  url: string;
  cover?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  author: {
    name: string;
    photoUrl?: string;
  };
  publishedAt: string;
  readMinutes?: number;
  tags?: string[];
  pinned: boolean;
  source: 'hashnode';
  updatedAt?: string;
}

export interface BundleEdition {
  schemaVersion: 2;
  generatedAt: string;
  sourceVersions: {
    [k: string]: number;
  };
  edition: {
    year: number;
    title: string;
    theme?: string;
    summary: string;
    highlight?: string;
    techStack?: string[];
    timeZone: string;
    startAt: string;
    endAt: string;
    registration: {
      url?: string;
      opensAt?: string;
      closesAt?: string;
    };
    venue: {
      name: string;
      address?: string;
      geo?: {
        lat: number;
        lng: number;
      };
      mapsUrl?: string;
      embedUrl?: string;
      image?: {
        url: string;
        alt: string;
        width?: number;
        height?: number;
      };
    };
    banner: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
      variants?: {
        long?: {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        };
        square?: {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        };
      };
    };
    badges?: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    }[];
    perks?: string[];
    notes?: string[];
    tracks: {
      id: string;
      label: string;
      color: string;
      frame?: {
        url: string;
        alt: string;
        width?: number;
        height?: number;
      };
      order: number;
    }[];
    speakerFrameDefault?: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
    sections: {
      schedule: boolean;
      speakers: boolean;
      sponsors: boolean;
      partners: boolean;
      faqs: boolean;
      perks: boolean;
      notes: boolean;
      registration: boolean;
    };
    recap?: {
      attendees?: number;
      sessions?: number;
      photosUrl?: string;
      videoUrl?: string;
    };
  };
  sessions: {
    id: string;
    title: string;
    description?: string;
    type:
      | 'keynote'
      | 'talk'
      | 'workshop'
      | 'panel'
      | 'lightning'
      | 'break'
      | 'registration'
      | 'networking'
      | 'other';
    startAt: string;
    endAt: string;
    trackId?: string;
    speakerIds: string[];
    room?: string;
    level?: 'beginner' | 'intermediate' | 'advanced';
    slidesUrl?: string;
    videoUrl?: string;
    order: number;
    speakers: {
      id: string;
      name: string;
      headline?: string;
      photo?: {
        url: string;
        alt: string;
        width?: number;
        height?: number;
      };
    }[];
  }[];
  speakers: {
    id: string;
    name: string;
    headline?: string;
    company?: string;
    bio?: string;
    photo: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
    trackId?: string;
    links?: {
      website?: string;
      github?: string;
      linkedin?: string;
      x?: string;
      instagram?: string;
      facebook?: string;
      youtube?: string;
      medium?: string;
    };
    order: number;
    sessionIds: string[];
  }[];
  sponsors: {
    id: string;
    name: string;
    tier: 'platinum' | 'gold' | 'silver' | 'bronze' | 'community' | 'venue' | 'media';
    logo: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
    url?: string;
    order: number;
  }[];
  partners: {
    id: string;
    name: string;
    logo: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
    url?: string;
    order: number;
  }[];
  faqs: {
    id: string;
    question: string;
    answer: string;
    order: number;
  }[];
  showcase: {
    id: string;
    title: string;
    summary: string;
    body?: string;
    /**
     * @minItems 1
     * @maxItems 8
     */
    team:
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ]
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ]
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ]
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ]
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ]
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ]
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ]
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ];
    links?: {
      repo?: string;
      demo?: string;
      video?: string;
    };
    /**
     * @maxItems 5
     */
    images?:
      | []
      | [
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          }
        ]
      | [
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          }
        ]
      | [
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          }
        ]
      | [
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          }
        ]
      | [
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          }
        ];
    tags?: string[];
    edition?: number;
    eventId?: string;
    featured: boolean;
    order: number;
  }[];
  modules: {
    id: string;
    type: 'cards' | 'gallery' | 'links' | 'richText' | 'showcase' | 'blogs';
    title: string;
    subtitle?: string;
    icon?: string;
    edition?: number;
    source:
      | {
          kind: 'items';
        }
      | {
          kind: 'inline';
          body: string;
        }
      | {
          kind: 'showcase';
          edition?: number;
          featuredOnly?: boolean;
          limit?: number;
        }
      | {
          kind: 'blogs';
          limit?: number;
          tag?: string;
        };
    placement: {
      app: {
        slot: 'homeCard' | 'eventSection' | 'aboutSection' | 'tab' | 'none';
        order: number;
      };
      web: {
        slot: 'page' | 'homeSection' | 'devfestSection' | 'none';
        order: number;
        path?: string;
      };
    };
    minAppBuild?: number;
    enabled: boolean;
    items?: (
      | {
          id: string;
          order: number;
          title: string;
          body?: string;
          image?: {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          };
          url?: string;
          tags?: string[];
        }
      | {
          id: string;
          order: number;
          image: {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          };
          caption?: string;
        }
      | {
          id: string;
          order: number;
          label: string;
          url: string;
          description?: string;
          icon?: string;
        }
    )[];
  }[];
}

export interface BundleEditions {
  schemaVersion: 2;
  generatedAt: string;
  sourceVersions: {
    [k: string]: number;
  };
  items: {
    year: number;
    title: string;
    theme?: string;
    highlight?: string;
    startAt: string;
    endAt: string;
    banner: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
      variants?: {
        long?: {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        };
        square?: {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        };
      };
    };
    venueName: string;
  }[];
}

export interface BundleHome {
  schemaVersion: 2;
  generatedAt: string;
  sourceVersions: {
    [k: string]: number;
  };
  site: {
    schemaVersion: 2;
    name: string;
    tagline?: string;
    description: string;
    email: string;
    joinUrl: string;
    links: {
      website?: string;
      github?: string;
      linkedin?: string;
      x?: string;
      instagram?: string;
      facebook?: string;
      youtube?: string;
      medium?: string;
    };
    region?: string;
    appLinks?: {
      android?: string;
      ios?: string;
    };
    activeEdition: number;
    eventMode: 'auto' | 'on' | 'off';
    eventModeLeadDays?: number;
    sections: {
      team: boolean;
      events: boolean;
      testimonials: boolean;
      faqs: boolean;
      blogs: boolean;
      showcase: boolean;
      pastEditions: boolean;
    };
  };
  edition: {
    year: number;
    title: string;
    theme?: string;
    summary: string;
    timeZone: string;
    startAt: string;
    endAt: string;
    registration: {
      url?: string;
      opensAt?: string;
      closesAt?: string;
    };
    venue: {
      name: string;
      address?: string;
      geo?: {
        lat: number;
        lng: number;
      };
      mapsUrl?: string;
      embedUrl?: string;
      image?: {
        url: string;
        alt: string;
        width?: number;
        height?: number;
      };
    };
    banner: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
      variants?: {
        long?: {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        };
        square?: {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        };
      };
    };
    badges?: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    }[];
    sections: {
      schedule: boolean;
      speakers: boolean;
      sponsors: boolean;
      partners: boolean;
      faqs: boolean;
      perks: boolean;
      notes: boolean;
      registration: boolean;
    };
    tracks: {
      id: string;
      label: string;
      color: string;
      frame?: {
        url: string;
        alt: string;
        width?: number;
        height?: number;
      };
      order: number;
    }[];
  };
  sponsors: {
    id: string;
    name: string;
    tier: 'platinum' | 'gold' | 'silver' | 'bronze' | 'community' | 'venue' | 'media';
    logo: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
    url?: string;
    order: number;
  }[];
  partners: {
    id: string;
    name: string;
    logo: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
    url?: string;
    order: number;
  }[];
  editionFaqs: {
    id: string;
    question: string;
    answer: string;
    order: number;
  }[];
  faqs: {
    id: string;
    question: string;
    answer: string;
    order: number;
  }[];
  testimonials: {
    id: string;
    name: string;
    title: string;
    body: string;
    eventLabel?: string;
    edition?: number;
    photo?: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
    featured: boolean;
    order: number;
  }[];
  team: {
    id: string;
    name: string;
    role: 'organizer' | 'volunteer' | 'alumni';
    headline?: string;
    photo: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
    links?: {
      website?: string;
      github?: string;
      linkedin?: string;
      x?: string;
      instagram?: string;
      facebook?: string;
      youtube?: string;
      medium?: string;
    };
    editions?: number[];
    active: boolean;
    order: number;
  }[];
  events: {
    id: string;
    title: string;
    tagline?: string;
    description?: string;
    startAt: string;
    endAt?: string;
    timeZone: string;
    venue?: {
      name: string;
      address?: string;
      geo?: {
        lat: number;
        lng: number;
      };
      mapsUrl?: string;
      embedUrl?: string;
      image?: {
        url: string;
        alt: string;
        width?: number;
        height?: number;
      };
    };
    online?: boolean;
    registration?: {
      url?: string;
      closesAt?: string;
    };
    cover?: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
    thumbnail?: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
    speakers?: {
      name: string;
      headline?: string;
      photo?: {
        url: string;
        alt: string;
        width?: number;
        height?: number;
      };
    }[];
    tags?: string[];
  }[];
  blogs: {
    id: string;
    title: string;
    brief: string;
    url: string;
    cover?: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
    author: {
      name: string;
      photoUrl?: string;
    };
    publishedAt: string;
    readMinutes?: number;
    tags?: string[];
    pinned: boolean;
    source: 'hashnode';
  }[];
  showcaseFeatured: {
    id: string;
    title: string;
    summary: string;
    body?: string;
    /**
     * @minItems 1
     * @maxItems 8
     */
    team:
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ]
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ]
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ]
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ]
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ]
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ]
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ]
      | [
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          },
          {
            name: string;
            links?: {
              website?: string;
              github?: string;
              linkedin?: string;
              x?: string;
              instagram?: string;
              facebook?: string;
              youtube?: string;
              medium?: string;
            };
          }
        ];
    links?: {
      repo?: string;
      demo?: string;
      video?: string;
    };
    /**
     * @maxItems 5
     */
    images?:
      | []
      | [
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          }
        ]
      | [
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          }
        ]
      | [
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          }
        ]
      | [
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          }
        ]
      | [
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          },
          {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          }
        ];
    tags?: string[];
    edition?: number;
    eventId?: string;
    featured: boolean;
    order: number;
  }[];
  modules: {
    id: string;
    type: 'cards' | 'gallery' | 'links' | 'richText' | 'showcase' | 'blogs';
    title: string;
    subtitle?: string;
    icon?: string;
    edition?: number;
    source:
      | {
          kind: 'items';
        }
      | {
          kind: 'inline';
          body: string;
        }
      | {
          kind: 'showcase';
          edition?: number;
          featuredOnly?: boolean;
          limit?: number;
        }
      | {
          kind: 'blogs';
          limit?: number;
          tag?: string;
        };
    placement: {
      app: {
        slot: 'homeCard' | 'eventSection' | 'aboutSection' | 'tab' | 'none';
        order: number;
      };
      web: {
        slot: 'page' | 'homeSection' | 'devfestSection' | 'none';
        order: number;
        path?: string;
      };
    };
    minAppBuild?: number;
    enabled: boolean;
    items?: (
      | {
          id: string;
          order: number;
          title: string;
          body?: string;
          image?: {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          };
          url?: string;
          tags?: string[];
        }
      | {
          id: string;
          order: number;
          image: {
            url: string;
            alt: string;
            width?: number;
            height?: number;
          };
          caption?: string;
        }
      | {
          id: string;
          order: number;
          label: string;
          url: string;
          description?: string;
          icon?: string;
        }
    )[];
  }[];
  pastEditions: {
    year: number;
    title: string;
    highlight?: string;
    banner: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
      variants?: {
        long?: {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        };
        square?: {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        };
      };
    };
    startAt: string;
  }[];
}

export interface CommunityEvent {
  title: string;
  tagline?: string;
  description?: string;
  startAt: string;
  endAt?: string;
  timeZone: string;
  venue?: {
    name: string;
    address?: string;
    geo?: {
      lat: number;
      lng: number;
    };
    mapsUrl?: string;
    embedUrl?: string;
    image?: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
  };
  online?: boolean;
  registration?: {
    url?: string;
    closesAt?: string;
  };
  cover?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  thumbnail?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  speakers?: {
    name: string;
    headline?: string;
    photo?: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
  }[];
  tags?: string[];
  updatedAt?: string;
}

export interface Edition {
  year: number;
  title: string;
  theme?: string;
  summary: string;
  highlight?: string;
  techStack?: string[];
  timeZone: string;
  startAt: string;
  endAt: string;
  registration: {
    url?: string;
    opensAt?: string;
    closesAt?: string;
  };
  venue: {
    name: string;
    address?: string;
    geo?: {
      lat: number;
      lng: number;
    };
    mapsUrl?: string;
    embedUrl?: string;
    image?: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
  };
  banner: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
    variants?: {
      long?: {
        url: string;
        alt: string;
        width?: number;
        height?: number;
      };
      square?: {
        url: string;
        alt: string;
        width?: number;
        height?: number;
      };
    };
  };
  badges?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
  perks?: string[];
  notes?: string[];
  tracks: {
    id: string;
    label: string;
    color: string;
    frame?: {
      url: string;
      alt: string;
      width?: number;
      height?: number;
    };
    order: number;
  }[];
  speakerFrameDefault?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  sections: {
    schedule: boolean;
    speakers: boolean;
    sponsors: boolean;
    partners: boolean;
    faqs: boolean;
    perks: boolean;
    notes: boolean;
    registration: boolean;
  };
  recap?: {
    attendees?: number;
    sessions?: number;
    photosUrl?: string;
    videoUrl?: string;
  };
  updatedAt?: string;
}

export interface Faq {
  question: string;
  answer: string;
  order: number;
  updatedAt?: string;
}

export interface ModuleItemCards {
  order: number;
  updatedAt?: string;
  title: string;
  body?: string;
  image?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  url?: string;
  tags?: string[];
}

export interface ModuleItemGallery {
  order: number;
  updatedAt?: string;
  image: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  caption?: string;
}

export interface ModuleItemLinks {
  order: number;
  updatedAt?: string;
  label: string;
  url: string;
  description?: string;
  icon?: string;
}

export interface Module {
  type: 'cards' | 'gallery' | 'links' | 'richText' | 'showcase' | 'blogs';
  title: string;
  subtitle?: string;
  icon?: string;
  edition?: number;
  source:
    | {
        kind: 'items';
      }
    | {
        kind: 'inline';
        body: string;
      }
    | {
        kind: 'showcase';
        edition?: number;
        featuredOnly?: boolean;
        limit?: number;
      }
    | {
        kind: 'blogs';
        limit?: number;
        tag?: string;
      };
  placement: {
    app: {
      slot: 'homeCard' | 'eventSection' | 'aboutSection' | 'tab' | 'none';
      order: number;
    };
    web: {
      slot: 'page' | 'homeSection' | 'devfestSection' | 'none';
      order: number;
      path?: string;
    };
  };
  minAppBuild?: number;
  enabled: boolean;
  updatedAt?: string;
}

export interface Partner {
  name: string;
  logo: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  url?: string;
  order: number;
  updatedAt?: string;
}

export interface Session {
  title: string;
  description?: string;
  type:
    | 'keynote'
    | 'talk'
    | 'workshop'
    | 'panel'
    | 'lightning'
    | 'break'
    | 'registration'
    | 'networking'
    | 'other';
  startAt: string;
  endAt: string;
  trackId?: string;
  speakerIds: string[];
  room?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  slidesUrl?: string;
  videoUrl?: string;
  order: number;
  updatedAt?: string;
}

export interface Showcase {
  title: string;
  summary: string;
  body?: string;
  /**
   * @minItems 1
   * @maxItems 8
   */
  team:
    | [
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        }
      ]
    | [
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        }
      ]
    | [
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        }
      ]
    | [
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        }
      ]
    | [
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        }
      ]
    | [
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        }
      ]
    | [
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        }
      ]
    | [
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        },
        {
          name: string;
          links?: {
            website?: string;
            github?: string;
            linkedin?: string;
            x?: string;
            instagram?: string;
            facebook?: string;
            youtube?: string;
            medium?: string;
          };
        }
      ];
  links?: {
    repo?: string;
    demo?: string;
    video?: string;
  };
  /**
   * @maxItems 5
   */
  images?:
    | []
    | [
        {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        }
      ]
    | [
        {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        },
        {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        }
      ]
    | [
        {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        },
        {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        },
        {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        }
      ]
    | [
        {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        },
        {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        },
        {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        },
        {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        }
      ]
    | [
        {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        },
        {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        },
        {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        },
        {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        },
        {
          url: string;
          alt: string;
          width?: number;
          height?: number;
        }
      ];
  tags?: string[];
  edition?: number;
  eventId?: string;
  featured: boolean;
  order: number;
  updatedAt?: string;
}

export interface SiteApp {
  schemaVersion: 2;
  minSupportedBuild: number;
  latestBuild: number;
  updateMessage?: string;
  storeUrls: {
    android: string;
    ios: string;
  };
  disabledModules: string[];
  maintenanceMessage?: string;
  updatedAt?: string;
}

export interface SiteConfig {
  schemaVersion: 2;
  name: string;
  tagline?: string;
  description: string;
  email: string;
  joinUrl: string;
  links: {
    website?: string;
    github?: string;
    linkedin?: string;
    x?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    medium?: string;
  };
  region?: string;
  appLinks?: {
    android?: string;
    ios?: string;
  };
  activeEdition: number;
  eventMode: 'auto' | 'on' | 'off';
  eventModeLeadDays?: number;
  sections: {
    team: boolean;
    events: boolean;
    testimonials: boolean;
    faqs: boolean;
    blogs: boolean;
    showcase: boolean;
    pastEditions: boolean;
  };
  updatedAt?: string;
}

export interface Speaker {
  name: string;
  headline?: string;
  company?: string;
  bio?: string;
  photo: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  trackId?: string;
  links?: {
    website?: string;
    github?: string;
    linkedin?: string;
    x?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    medium?: string;
  };
  order: number;
  updatedAt?: string;
}

export interface Sponsor {
  name: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze' | 'community' | 'venue' | 'media';
  logo: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  url?: string;
  order: number;
  updatedAt?: string;
}

export interface TeamMember {
  name: string;
  role: 'organizer' | 'volunteer' | 'alumni';
  headline?: string;
  photo: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  links?: {
    website?: string;
    github?: string;
    linkedin?: string;
    x?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    medium?: string;
  };
  editions?: number[];
  active: boolean;
  order: number;
  updatedAt?: string;
}

export interface Testimonial {
  name: string;
  title: string;
  body: string;
  eventLabel?: string;
  edition?: number;
  photo?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  featured: boolean;
  order: number;
  updatedAt?: string;
}
