// init-database.js
import { db, collection, addDoc, getDocs, query, where } from './firebase-config.js';

// Données par défaut complètes
const defaultData = {
    // Services
    services: [
        {
            name: "Conseil Informatique",
            description: "Audit technique, stratégie IT et accompagnement dans vos choix technologiques. Nous vous aidons à optimiser votre infrastructure informatique et à définir une stratégie digitale adaptée à vos objectifs commerciaux.",
            icon: "fas fa-lightbulb",
            features: ["Audit complet des systèmes", "Stratégie digitale personnalisée", "Accompagnement technique", "Optimisation des coûts IT"],
            imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600",
            order: 1,
            active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            name: "Maintenance & Administration Réseaux",
            description: "Gestion complète de votre infrastructure réseau avec supervision 24/7, sécurité avancée et support technique réactif pour garantir la continuité de vos opérations.",
            icon: "fas fa-server",
            features: ["Supervision 24h/24 et 7j/7", "Sécurité réseau avancée", "Support technique prioritaire", "Sauvegarde et restauration"],
            imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
            order: 2,
            active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            name: "Installation de Caméras de Surveillance",
            description: "Solutions de vidéosurveillance professionnelles avec caméras HD, vision nocturne et accès à distance pour sécuriser vos locaux 24h/24.",
            icon: "fas fa-camera",
            features: ["Caméras HD 4K", "Vision nocturne infrarouge", "Accès à distance mobile", "Détection de mouvement IA"],
            imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600",
            order: 3,
            active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            name: "Systèmes Embarqués & IoT",
            description: "Conception de solutions sur mesure pour l'IoT avec prototypage rapide, firmware custom et intégration de capteurs intelligents pour l'industrie 4.0.",
            icon: "fas fa-microchip",
            features: ["Prototypage rapide", "Firmware personnalisé", "IoT et capteurs connectés", "Solutions sur mesure"],
            imageUrl: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600",
            order: 4,
            active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ],
    
    // Réalisations
    realisations: [
        {
            title: "Installation Caméras Surveillance - Siège Social",
            description: "Installation professionnelle d'un système de vidéosurveillance complet avec 24 caméras 4K, enregistrement 60 jours et accès à distance sécurisé pour le siège social.",
            type: "photo",
            mediaUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800",
            thumbnailUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400",
            tags: ["Surveillance", "Sécurité", "4K", "Installation"],
            client: "Siège Social",
            year: 2025,
            featured: true,
            createdAt: new Date().toISOString()
        },
        {
            title: "Déploiement Réseau Fibre Optique",
            description: "Installation d'un réseau fibre optique haut débit connectant 8 bâtiments sur 3.5km avec redondance et sécurité renforcée.",
            type: "photo",
            mediaUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
            thumbnailUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
            tags: ["Réseau", "Fibre optique", "Haut débit", "Infrastructure"],
            client: "Kamoto Copper Company",
            year: 2025,
            featured: true,
            createdAt: new Date().toISOString()
        },
        {
            title: "Système IoT - Contrôle d'Accès Intelligent",
            description: "Développement et installation d'un système de contrôle d'accès basé sur IoT avec reconnaissance faciale, badge RFID et application mobile.",
            type: "video",
            mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            thumbnailUrl: "https://via.placeholder.com/400x300?text=IoT+Control",
            tags: ["IoT", "Embarqué", "Contrôle d'accès", "Reconnaissance faciale"],
            client: "Malabar Group",
            year: 2025,
            featured: true,
            createdAt: new Date().toISOString()
        },
        {
            title: "Centre de Données Virtualisé",
            description: "Installation d'un centre de données avec virtualisation complète, sauvegarde automatisée et redondance électrique pour une disponibilité 99.99%.",
            type: "photo",
            mediaUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
            thumbnailUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
            tags: ["Data Center", "Virtualisation", "Sauvegarde", "Haute disponibilité"],
            client: "Thiermar Company",
            year: 2024,
            featured: false,
            createdAt: new Date().toISOString()
        },
        {
            title: "Système de Télésurveillance",
            description: "Mise en place d'un système de télésurveillance avec analyse vidéo intelligente et alertes en temps réel.",
            type: "video",
            mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            thumbnailUrl: "https://via.placeholder.com/400x300?text=TeleSurveillance",
            tags: ["Télésurveillance", "IA", "Alertes", "Sécurité"],
            client: "Mwalimu Logistics",
            year: 2024,
            featured: false,
            createdAt: new Date().toISOString()
        }
    ],
    
    // Partenaires
    partenaires: [
        {
            name: "Mwalimu Logistics",
            website: "https://mwalimulogistics.com",
            logoUrl: "https://via.placeholder.com/120x120?text=Mwalimu",
            description: "Solutions logistiques intégrées en Afrique centrale",
            category: "Logistique",
            featured: true,
            createdAt: new Date().toISOString()
        },
        {
            name: "Thiermar Company",
            website: "https://www.thiermarcompany.com",
            logoUrl: "https://via.placeholder.com/120x120?text=Thiermar",
            description: "Ingénierie et services industriels",
            category: "Ingénierie",
            featured: true,
            createdAt: new Date().toISOString()
        },
        {
            name: "Kamoto Copper Company",
            website: "https://www.kamotocoppercompany.com",
            logoUrl: "https://via.placeholder.com/120x120?text=Kamoto",
            description: "Exploitation minière de classe mondiale",
            category: "Mines",
            featured: true,
            createdAt: new Date().toISOString()
        },
        {
            name: "Malabar Group",
            website: "https://www.malabar-group.com",
            logoUrl: "https://via.placeholder.com/120x120?text=Malabar",
            description: "Commerce et distribution internationale",
            category: "Commerce",
            featured: true,
            createdAt: new Date().toISOString()
        }
    ],
    
    // Équipe de direction
    team: [
        {
            name: "Msc LUKIS LUBABA",
            position: "Manager Principal",
            degree: "Master en Informatique des Réseaux",
            experience: "7+ ans d'expérience",
            photo: "https://via.placeholder.com/200x200?text=Lukis",
            quote: "Expert en architecture réseau et sécurité informatique",
            email: "lukis@medisoft.com",
            phone: "+243 977 173 339",
            specialties: ["Architecture réseau", "Sécurité IT", "Cloud Computing"],
            social: { linkedin: "#", twitter: "#" },
            order: 1,
            active: true,
            createdAt: new Date().toISOString()
        },
        {
            name: "Ir JORDAN MUKALAMUSI",
            position: "Manager Régional",
            degree: "Master en Génie Informatique",
            experience: "5+ ans d'expérience",
            photo: "https://via.placeholder.com/200x200?text=Jordan",
            quote: "Spécialiste en systèmes embarqués et IoT",
            email: "jordan@medisoft.com",
            phone: "+243 896 538 081",
            specialties: ["Systèmes embarqués", "IoT", "Robotique"],
            social: { linkedin: "#", twitter: "#" },
            order: 2,
            active: true,
            createdAt: new Date().toISOString()
        },
        {
            name: "JOCELINE TWITE",
            position: "Secrétaire Principal",
            degree: "Ir en Systèmes Informatiques",
            experience: "3+ ans d'expérience",
            photo: "https://via.placeholder.com/200x200?text=Joceline",
            quote: "Experte en gestion de systèmes et administration IT",
            email: "joceline@medisoft.com",
            phone: "+243 896 538 082",
            specialties: ["Administration IT", "Gestion de projets", "Support technique"],
            social: { linkedin: "#", twitter: "#" },
            order: 3,
            active: true,
            createdAt: new Date().toISOString()
        }
    ],
    
    // Statistiques
    stats: [
        { label: "Projets réalisés", value: 35, suffix: "", icon: "fas fa-project-diagram" },
        { label: "Clients satisfaits", value: 20, suffix: "+", icon: "fas fa-smile" },
        { label: "Années d'expérience", value: 5, suffix: "", icon: "fas fa-calendar-alt" },
        { label: "Support 24/7", value: 24, suffix: "/7", icon: "fas fa-headset" }
    ],
    
    // Témoignages
    testimonials: [
        {
            name: "Jean-Pierre K.",
            position: "Directeur IT, Kamoto Copper",
            content: "Medisoft a transformé notre infrastructure réseau. Professionnalisme et réactivité exceptionnels.",
            rating: 5,
            photo: "https://via.placeholder.com/80x80?text=JP",
            createdAt: new Date().toISOString()
        },
        {
            name: "Marie L.",
            position: "CEO, Malabar Group",
            content: "Solutions IoT innovantes qui ont amélioré notre sécurité et notre efficacité opérationnelle.",
            rating: 5,
            photo: "https://via.placeholder.com/80x80?text=ML",
            createdAt: new Date().toISOString()
        }
    ],
    
    // FAQ
    faq: [
        {
            question: "Quels sont vos délais d'intervention ?",
            answer: "Nous intervenons sous 24h en urgence et planifions les projets selon vos besoins.",
            category: "général",
            order: 1,
            createdAt: new Date().toISOString()
        },
        {
            question: "Proposez-vous des contrats de maintenance ?",
            answer: "Oui, nous proposons des contrats de maintenance adaptés à vos besoins avec support 24/7.",
            category: "maintenance",
            order: 2,
            createdAt: new Date().toISOString()
        }
    ],
    
    // Paramètres du site
    settings: {
        siteName: "Medisoft Services Sarl",
        siteDescription: "Solutions technologiques professionnelles pour votre transformation digitale",
        siteEmail: "medisoftservice01@gmail.com",
        sitePhone: "+243 977 173 339",
        siteAddress: "N°58 Av. Mama Yemo, Q. Industriel, C. Dilala, Kolwezi, RDC",
        socialMedia: {
            facebook: "https://facebook.com/medisoft",
            twitter: "https://twitter.com/medisoft",
            linkedin: "https://linkedin.com/company/medisoft",
            instagram: "https://instagram.com/medisoft"
        },
        workingHours: "Lundi - Vendredi: 8h00 - 18h00",
        updatedAt: new Date().toISOString()
    }
};

// Fonction principale d'initialisation
export async function initializeDatabase() {
    console.log("🚀 Démarrage de l'initialisation de la base de données...");
    
    const results = {
        services: { created: 0, existing: 0, errors: 0 },
        realisations: { created: 0, existing: 0, errors: 0 },
        partenaires: { created: 0, existing: 0, errors: 0 },
        team: { created: 0, existing: 0, errors: 0 },
        stats: { created: 0, existing: 0, errors: 0 },
        testimonials: { created: 0, existing: 0, errors: 0 },
        faq: { created: 0, existing: 0, errors: 0 },
        settings: { created: 0, existing: 0, errors: 0 }
    };
    
    try {
        // Initialiser les services
        const servicesSnapshot = await getDocs(collection(db, 'services'));
        if (servicesSnapshot.empty) {
            for (const service of defaultData.services) {
                await addDoc(collection(db, 'services'), service);
                results.services.created++;
            }
            console.log(`✅ ${results.services.created} services créés`);
        } else {
            results.services.existing = servicesSnapshot.size;
            console.log(`ℹ️ ${results.services.existing} services existent déjà`);
        }
        
        // Initialiser les réalisations
        const realisationsSnapshot = await getDocs(collection(db, 'realisations'));
        if (realisationsSnapshot.empty) {
            for (const realisation of defaultData.realisations) {
                await addDoc(collection(db, 'realisations'), realisation);
                results.realisations.created++;
            }
            console.log(`✅ ${results.realisations.created} réalisations créées`);
        } else {
            results.realisations.existing = realisationsSnapshot.size;
            console.log(`ℹ️ ${results.realisations.existing} réalisations existent déjà`);
        }
        
        // Initialiser les partenaires
        const partenairesSnapshot = await getDocs(collection(db, 'partenaires'));
        if (partenairesSnapshot.empty) {
            for (const partenaire of defaultData.partenaires) {
                await addDoc(collection(db, 'partenaires'), partenaire);
                results.partenaires.created++;
            }
            console.log(`✅ ${results.partenaires.created} partenaires créés`);
        } else {
            results.partenaires.existing = partenairesSnapshot.size;
            console.log(`ℹ️ ${results.partenaires.existing} partenaires existent déjà`);
        }
        
        // Initialiser l'équipe
        const teamSnapshot = await getDocs(collection(db, 'team'));
        if (teamSnapshot.empty) {
            for (const member of defaultData.team) {
                await addDoc(collection(db, 'team'), member);
                results.team.created++;
            }
            console.log(`✅ ${results.team.created} membres d'équipe créés`);
        } else {
            results.team.existing = teamSnapshot.size;
            console.log(`ℹ️ ${results.team.existing} membres d'équipe existent déjà`);
        }
        
        // Initialiser les statistiques
        const statsSnapshot = await getDocs(collection(db, 'stats'));
        if (statsSnapshot.empty) {
            for (const stat of defaultData.stats) {
                await addDoc(collection(db, 'stats'), stat);
                results.stats.created++;
            }
            console.log(`✅ ${results.stats.created} statistiques créées`);
        } else {
            results.stats.existing = statsSnapshot.size;
            console.log(`ℹ️ ${results.stats.existing} statistiques existent déjà`);
        }
        
        // Initialiser les témoignages
        const testimonialsSnapshot = await getDocs(collection(db, 'testimonials'));
        if (testimonialsSnapshot.empty) {
            for (const testimonial of defaultData.testimonials) {
                await addDoc(collection(db, 'testimonials'), testimonial);
                results.testimonials.created++;
            }
            console.log(`✅ ${results.testimonials.created} témoignages créés`);
        } else {
            results.testimonials.existing = testimonialsSnapshot.size;
            console.log(`ℹ️ ${results.testimonials.existing} témoignages existent déjà`);
        }
        
        // Initialiser la FAQ
        const faqSnapshot = await getDocs(collection(db, 'faq'));
        if (faqSnapshot.empty) {
            for (const faq of defaultData.faq) {
                await addDoc(collection(db, 'faq'), faq);
                results.faq.created++;
            }
            console.log(`✅ ${results.faq.created} FAQ créées`);
        } else {
            results.faq.existing = faqSnapshot.size;
            console.log(`ℹ️ ${results.faq.existing} FAQ existent déjà`);
        }
        
        // Initialiser les paramètres
        const settingsQuery = await getDocs(collection(db, 'settings'));
        if (settingsQuery.empty) {
            await addDoc(collection(db, 'settings'), defaultData.settings);
            results.settings.created++;
            console.log(`✅ Paramètres du site créés`);
        } else {
            results.settings.existing = settingsQuery.size;
            console.log(`ℹ️ Les paramètres existent déjà`);
        }
        
        console.log("🎉 Initialisation complète terminée avec succès !");
        console.log("📊 Résumé:", results);
        
        return { success: true, results };
        
    } catch (error) {
        console.error("❌ Erreur lors de l'initialisation:", error);
        return { success: false, error: error.message, results };
    }
}

// Fonction pour vérifier si la base est vide
export async function isDatabaseEmpty() {
    try {
        const collections = ['services', 'realisations', 'partenaires', 'team', 'stats', 'testimonials', 'faq'];
        let totalDocs = 0;
        
        for (const collectionName of collections) {
            const snapshot = await getDocs(collection(db, collectionName));
            totalDocs += snapshot.size;
        }
        
        return totalDocs === 0;
    } catch (error) {
        console.error("Erreur de vérification:", error);
        return true;
    }
}

// Fonction pour réinitialiser la base (supprime tout et réinitialise)
export async function resetDatabase() {
    if (!confirm("⚠️ ATTENTION : Cette action va supprimer TOUTES les données existantes. Voulez-vous continuer ?")) {
        return { success: false, message: "Opération annulée" };
    }
    
    try {
        const collections = ['services', 'realisations', 'partenaires', 'team', 'stats', 'testimonials', 'faq', 'settings'];
        let deleted = 0;
        
        for (const collectionName of collections) {
            const snapshot = await getDocs(collection(db, collectionName));
            for (const doc of snapshot.docs) {
                await deleteDoc(doc.ref);
                deleted++;
            }
        }
        
        console.log(`🗑️ ${deleted} documents supprimés`);
        
        // Réinitialiser avec les données par défaut
        const initResult = await initializeDatabase();
        
        return { success: true, deleted, created: initResult.results };
        
    } catch (error) {
        console.error("Erreur lors de la réinitialisation:", error);
        return { success: false, error: error.message };
    }
}

// Fonction pour ajouter des données de test
export async function addTestData() {
    console.log("🧪 Ajout de données de test...");
    // Vous pouvez ajouter des données de test supplémentaires ici
}
