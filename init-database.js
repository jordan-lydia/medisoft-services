// init-database.js
import { db, collection, addDoc, getDocs } from './firebase-config.js';

// Données par défaut
const defaultData = {
    services: [
        {
            name: "Conseil Informatique",
            description: "Audit technique, stratégie IT et accompagnement dans vos choix technologiques. Nous vous aidons à optimiser votre infrastructure informatique.",
            icon: "fas fa-lightbulb",
            features: ["Audit complet", "Stratégie digitale", "Accompagnement personnalisé"],
            createdAt: new Date().toISOString()
        },
        {
            name: "Maintenance & Administration Réseaux",
            description: "Gestion complète de votre infrastructure réseau avec supervision 24/7, sécurité avancée et support technique réactif.",
            icon: "fas fa-server",
            features: ["Supervision 24/7", "Sécurité réseau", "Support technique"],
            createdAt: new Date().toISOString()
        },
        {
            name: "Installation de Caméras de Surveillance",
            description: "Solutions de vidéosurveillance professionnelles avec caméras HD, vision nocturne et accès à distance.",
            icon: "fas fa-camera",
            features: ["Caméras HD", "Vision nocturne", "Accès à distance"],
            createdAt: new Date().toISOString()
        },
        {
            name: "Systèmes Embarqués",
            description: "Conception de solutions sur mesure pour l'IoT avec prototypage rapide, firmware custom et intégration de capteurs intelligents.",
            icon: "fas fa-microchip",
            features: ["Prototypage rapide", "Firmware custom", "IoT & Capteurs"],
            createdAt: new Date().toISOString()
        }
    ],
    
    realisations: [
        {
            title: "Installation Caméras Surveillance - Siège",
            description: "Installation professionnelle d'un système de vidéosurveillance avec 16 caméras HD, enregistrement 30 jours et accès à distance.",
            type: "photo",
            mediaUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800",
            tags: ["Surveillance", "Sécurité", "HD"],
            createdAt: new Date().toISOString()
        },
        {
            title: "Déploiement Réseau Fibre Optique",
            description: "Installation d'un réseau fibre optique haut débit connectant 5 bâtiments sur 2km avec redondance.",
            type: "photo",
            mediaUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
            tags: ["Réseau", "Fibre", "Haut débit"],
            createdAt: new Date().toISOString()
        },
        {
            title: "Système IoT - Contrôle d'Accès",
            description: "Développement d'un système de contrôle d'accès IoT avec reconnaissance faciale et badge RFID.",
            type: "video",
            mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            tags: ["IoT", "Embarqué", "Contrôle d'accès"],
            createdAt: new Date().toISOString()
        },
        {
            title: "Centre de Données - Kolwezi",
            description: "Installation d'un centre de données avec virtualisation et sauvegarde automatisée.",
            type: "photo",
            mediaUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
            tags: ["Data Center", "Virtualisation"],
            createdAt: new Date().toISOString()
        }
    ],
    
    partenaires: [
        {
            name: "Mwalimu Logistics",
            website: "https://mwalimulogistics.com",
            logoUrl: "https://via.placeholder.com/120x120?text=Mwalimu",
            description: "Solutions logistiques intégrées",
            createdAt: new Date().toISOString()
        },
        {
            name: "Thiermar Company",
            website: "https://www.thiermarcompany.com",
            logoUrl: "https://via.placeholder.com/120x120?text=Thiermar",
            description: "Ingénierie et services",
            createdAt: new Date().toISOString()
        },
        {
            name: "Kamoto Copper Company",
            website: "https://www.kamotocoppercompany.com",
            logoUrl: "https://via.placeholder.com/120x120?text=Kamoto",
            description: "Exploitation minière",
            createdAt: new Date().toISOString()
        },
        {
            name: "Malabar Group",
            website: "https://www.malabar-group.com",
            logoUrl: "https://via.placeholder.com/120x120?text=Malabar",
            description: "Commerce et distribution",
            createdAt: new Date().toISOString()
        }
    ],
    
    team: [
        {
            name: "Msc LUKIS LUBABA",
            position: "Manager Principal",
            degree: "Master en Informatique des Réseaux",
            experience: "7+ ans d'expérience",
            photo: "https://via.placeholder.com/200x200?text=Lukis",
            quote: "Expert en architecture réseau et sécurité informatique",
            createdAt: new Date().toISOString()
        },
        {
            name: "Ir JORDAN MUKALAMUSI",
            position: "Manager Régional",
            degree: "Master en Génie Informatique",
            experience: "5+ ans d'expérience",
            photo: "https://via.placeholder.com/200x200?text=Jordan",
            quote: "Spécialiste en systèmes embarqués et IoT",
            createdAt: new Date().toISOString()
        },
        {
            name: "JOCELINE TWITE",
            position: "Secrétaire Principal",
            degree: "Ir en Systèmes Informatiques",
            experience: "3+ ans d'expérience",
            photo: "https://via.placeholder.com/200x200?text=Joceline",
            quote: "Experte en gestion de systèmes et administration IT",
            createdAt: new Date().toISOString()
        }
    ]
};

// Fonction principale d'initialisation
export async function initializeDatabase() {
    console.log("🔄 Vérification et initialisation de la base de données...");
    
    const results = {
        services: { created: 0, existing: 0 },
        realisations: { created: 0, existing: 0 },
        partenaires: { created: 0, existing: 0 },
        team: { created: 0, existing: 0 }
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
        
        console.log("🎉 Initialisation terminée avec succès !");
        return { success: true, results };
        
    } catch (error) {
        console.error("❌ Erreur lors de l'initialisation:", error);
        return { success: false, error: error.message };
    }
}

// Vérifier si la base est vide
export async function isDatabaseEmpty() {
    try {
        const collections = ['services', 'realisations', 'partenaires', 'team'];
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
