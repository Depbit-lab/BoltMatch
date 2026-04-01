// BoltMatch Core Logic Simulation

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Internationalization (i18n) Engine ---
    const translations = {
        en: {
            login_subtitle: "Sovereign Connections on Nostr",
            use_extension: "Use Extension (NIP-07)",
            or_divider: "OR",
            reg_prompt: "Create an account and receive your keys via email.",
            btn_register_email: "Generate & Send via Email",
            ob_title: "Create your profile",
            ob_subtitle: "Join the Nostr web of trust.",
            ob_name_label: "What is your name?",
            ob_gender_label: "I am...",
            ob_seeking_label: "Seeking to meet...",
            ob_zip_label: "Postal Code (Public Geohash)",
            ob_btn: "Enter BoltMatch ⚡",
            male: "Male",
            female: "Female",
            men: "Men",
            women: "Women",
            inbox_title: "Zaps & Messages",
            inbox_subtitle: "Your connections prioritized by LN value.",
            btn_reco: "Give Reco (QR)",
            my_identity: "My Nostr Identity",
            lang_title: "App Language",
            match_pref: "Match Preference",
            local_location: "Local Location",
            nip05_status: "NIP-05 Status (Identity)",
            verified: "Verified",
            zaps_today: "Zaps Sent Today",
            dating_mode: "Dating Mode",
            active: "Active",
            nav_radar: "Radar",
            nav_zaps: "Zaps",
            nav_wot: "WoT",
            match_title: "It's a Match!",
            match_desc: "A connection has been established with",
            match_btn_chat: "Write Now (Free)",
            match_btn_keep: "Keep Looking",
            qr_title: "Wingman Protocol",
            qr_desc: "Endorse real people in physical dates to certify their reputation level on the network.",
            my_qr: "My QR",
            scan_qr: "Scan",
            close: "Close",
            login_manual_prompt: "Login with Mnemonic or nsec key.",
            btn_login_manual: "Access with My Words ⚡",
            ob_bio_label: "About Me (Bio)",
            btn_edit: "Edit Profile",
            edit_title: "Edit My Identity",
            edit_name: "Name / Handle",
            edit_bio: "Bio / Description",
            upload_hint: "Tip: Click your photo to upload a new one.",
            save: "Save",
            cancel: "Cancel",
            my_qr_label: "Wingman (QR) Protocol",
            open: "Open",
            radar_connecting: "Connecting with Nostr Relays...",
            radar_searching: "Searching for profiles with reputation",
            inbox_empty: "Your inbox is empty.",
            inbox_hint: "Try sending Zaps in the Radar.",
            reality: "Reality",
            mutuals: "Mutuals",
            proximity: "Proximity",
            zap_btn: "Zap",
            cost_label: "Cost:",
            search_radius: "Search Radius",
            any_distance: "Any distance",
            wait_check: "Connect to Nostr...",
            wait_keys: "⏳ Generating keys..."
        },
        es: {
            login_subtitle: "Conexiones Soberanas en Nostr",
            use_extension: "Usar Extensión (NIP-07)",
            or_divider: "Ó",
            reg_prompt: "Crea una cuenta y recibe tus claves por email.",
            btn_register_email: "Generar & Enviar por Email",
            ob_title: "Crea tu perfil",
            ob_subtitle: "Únete a la red de confianza Nostr.",
            ob_name_label: "¿Cómo te llamas?",
            ob_gender_label: "Soy...",
            ob_seeking_label: "Busco conocer...",
            ob_zip_label: "Código Postal (Geohash Público)",
            ob_btn: "Entrar a BoltMatch ⚡",
            male: "Hombre",
            female: "Mujer",
            men: "Hombres",
            women: "Mujeres",
            inbox_title: "Zaps & Mensajes",
            inbox_subtitle: "Tus conexiones priorizadas por valor en LN.",
            btn_reco: "Dar Reco (QR)",
            my_identity: "Mi Identidad Nostr",
            lang_title: "Idioma de la App",
            match_pref: "Preferencia de Match",
            local_location: "Ubicación Local",
            nip05_status: "Estado NIP-05 (Identidad)",
            verified: "Verificado",
            zaps_today: "Zaps Enviados Hoy",
            dating_mode: "Modo Citas",
            active: "Activo",
            nav_radar: "Radar",
            nav_zaps: "Zaps",
            nav_wot: "WoT",
            match_title: "¡Es un Match!",
            match_desc: "Se ha creado una conexión con",
            match_btn_chat: "Escribir Ahora (Gratis)",
            match_btn_keep: "Seguir Buscando",
            qr_title: "Protocolo Wingman",
            qr_desc: "Endosa a personas reales en citas físicas para certificar su nivel de reputación en la red.",
            my_qr: "Mi QR",
            scan_qr: "Escanear",
            close: "Cerrar",
            login_manual_prompt: "Entra con tu Frase o clave nsec.",
            btn_login_manual: "Acceder con mis Palabras ⚡",
            ob_bio_label: "Sobre mí (Bio)",
            btn_edit: "Editar Perfil",
            edit_title: "Edita tu Identidad",
            edit_name: "Nombre / Seudónimo",
            edit_bio: "Bio / Descripción",
            upload_hint: "Tip: Haz clic en tu foto para subir una nueva.",
            save: "Guardar",
            cancel: "Cancelar",
            my_qr_label: "Protocolo Wingman (QR)",
            open: "Abrir",
            radar_connecting: "Conectando con Relays Nostr...",
            radar_searching: "Buscando perfiles con reputación",
            inbox_empty: "Tu bandeja está vacía.",
            inbox_hint: "Prueba enviando Zaps en el Radar.",
            reality: "Realidad",
            mutuals: "Comunes",
            proximity: "Cercanía",
            zap_btn: "Zap",
            cost_label: "Costo:",
            search_radius: "Radio de Búsqueda",
            any_distance: "Cualquier distancia",
            wait_check: "Conectando a Nostr...",
            wait_keys: "⏳ Generando claves..."
        }
    };

    let currentLang = localStorage.getItem('boltmatch_lang') || 
                      (navigator.language.startsWith('es') ? 'es' : 'en');

    // Radius Logic
    let searchRadius = parseInt(localStorage.getItem('boltmatch_radius') || "35");
    const radiusSlider = document.getElementById('radius-slider');
    const radiusDisplay = document.getElementById('display-radius');
    
    function updateRadiusUI() {
        if (radiusDisplay) {
            radiusDisplay.innerText = searchRadius >= 500 ? (currentLang === 'es' ? 'Cualquiera' : 'Global') : `${searchRadius} km`;
        }
        if (radiusSlider) radiusSlider.value = searchRadius;
    }
    
    updateRadiusUI();

    if (radiusSlider) {
        radiusSlider.addEventListener('input', (e) => {
            searchRadius = parseInt(e.target.value);
            localStorage.setItem('boltmatch_radius', searchRadius);
            updateRadiusUI();
            
            // Clear current stack to apply new filters if user wants
            // radarStack.innerHTML = '...'; 
        });
    }

    function updateUI() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.innerText = translations[currentLang][key];
            }
        });
        
        // Update toggles for Lang
        document.querySelectorAll('#group-lang .toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-val') === currentLang);
        });
        
        updateRadiusUI();
    }

    // Set initial UI
    updateUI();

    // Language Toggle Handler
    document.querySelectorAll('#group-lang .toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.getAttribute('data-val');
            localStorage.setItem('boltmatch_lang', currentLang);
            updateUI();
        });
    });
    
    // --- Magic Link / Token Handler ---
    const urlParams = new URLSearchParams(window.location.search);
    const loginToken = urlParams.get('login');
    if (loginToken && loginToken.startsWith('nsec1')) {
        // We'll decode this in the login logic below
        localStorage.setItem('boltmatch_nsec', loginToken);
        // Remove from URL to keep it clean
        window.history.replaceState({}, document.title, "/");
    }
    
    // --- Navigation Logic ---
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update Active Nav Icon
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Switch Views
            const targetId = item.getAttribute('data-target');
            views.forEach(view => {
                if(view.id === targetId) {
                    view.classList.add('active');
                } else {
                    view.classList.remove('active');
                }
            });
        });
    });

    // --- Progressive Zap Simulation Logic Globals ---
    let dailyZapsSent = 0;
    const zapsSentStats = document.getElementById('zaps-sent-today');
    const walletBalance = document.getElementById('wallet-balance');
    let currentBalance = 1200;

    // Formula: 21 * (5 ^ zapsSent)
    function calculateZapCost(count) {
        const baseCost = 21;
        return baseCost * Math.pow(5, count); 
    }

    // --- Location, Distance & Preferences Engine ---
    let currentUserLocation = { lat: 40.4168, lon: -3.7038 }; // Default (Madrid)
    let userSeekingPref = 'hombres'; // Default preference

    function hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371; 
        const dLat = deg2rad(lat2 - lat1);  
        const dLon = deg2rad(lon2 - lon1); 
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return R * c;
    }

    // Convert ZIP code hash into a stable Lat/Lng
    function getLatLonFromZip(zipString) {
        let hash = hashString(zipString || "28001");
        let lat = 36 + (Math.abs(hash) % 7000) / 1000;
        let lon = -9 + (Math.abs(hash >> 4) % 12000) / 1000;
        return {lat, lon};
    }

    // Seed a location deterministically near the user base location
    function getMockLocationNear(lat, lon, seedString, maxRadiusKm) {
        let hash1 = hashString(seedString + "lat");
        let hash2 = hashString(seedString + "lon");
        let radiusDeg = maxRadiusKm / 111; 
        let latOffset = ((Math.abs(hash1) % 1000) / 500 - 1) * radiusDeg;
        let lonOffset = ((Math.abs(hash2) % 1000) / 500 - 1) * (radiusDeg / Math.cos(deg2rad(lat)));
        return { lat: lat + latOffset, lon: lon + lonOffset };
    }

    // --- Nostr Radar Engine ---
    const radarStack = document.getElementById('radar-stack');
    const radarLoader = document.getElementById('radar-loader');
    let profileQueue = [];
    let isRendering = false;

    function renderNextProfile() {
        if (profileQueue.length === 0) return;
        if (isRendering) return;
        isRendering = true;
        
        if (radarLoader) {
            radarLoader.style.display = 'none';
        }

        const profile = profileQueue.shift();
        if (!profile) {
            isRendering = false;
            return;
        }

        // Mock trust metrics for display
        const mockTrustLevel = Math.floor(Math.random() * 5) + 1;
        const mockReality = Math.floor(Math.random() * 20) + 80; // 80 to 99
        const mockMutuals = Math.floor(Math.random() * 10);

        // Determinstic Distance Calculation based on User's ZIP and Target's Pubkey
        const profileLoc = getMockLocationNear(currentUserLocation.lat, currentUserLocation.lon, profile.pubkeyHex || profile.name, 35); // Max 35km radius
        const calculatedDistance = Math.round(getDistanceFromLatLonInKm(currentUserLocation.lat, currentUserLocation.lon, profileLoc.lat, profileLoc.lon));
        const mockDistance = Math.max(1, calculatedDistance);

        // FILTER: Check if distance is within radius
        if (searchRadius < 500 && mockDistance > searchRadius) {
            // Skip this profile and find another
            console.log(`Skipping ${profile.name} - Distance ${mockDistance}km > Radius ${searchRadius}km`);
            isRendering = false;
            return renderNextProfile();
        }

        const card = document.createElement('div');
        card.className = 'profile-card';
        card.style.position = 'absolute';
        
        const name = profile.display_name || profile.name || 'Soberano Anónimo';
        let picture = profile.picture || 'https://images.unsplash.com/photo-1544502062-f82887f03d1c?auto=format&fit=crop&q=80&w=600&h=800';
        if (!picture.startsWith('http')) {
            picture = 'https://images.unsplash.com/photo-1544502062-f82887f03d1c?auto=format&fit=crop&q=80&w=600&h=800';
        }

        const nip05Text = profile.nip05 ? `<p class="profile-proximity">NIP-05: ${profile.nip05.substring(0, 20)}</p>` : `<p class="profile-proximity">Pubkey: npub...${profile.pubkeyHex.substr(0,4)}</p>`;
        const verifiedIcon = profile.nip05 ? `<span class="verified-check">✅</span>` : ``;
        const currentCost = calculateZapCost(dailyZapsSent).toLocaleString();

        card.innerHTML = `
            <div class="profile-image-container">
                <img src="${picture}" alt="Profile" class="profile-image" onerror="this.src='https://images.unsplash.com/photo-1544502062-f82887f03d1c?auto=format&fit=crop&q=80&w=600&h=800'">
                <div class="trust-badge badge-gold">
                    <span class="badge-icon">🛡️</span> Nivel ${mockTrustLevel}: ${['Fuerte', 'Plata', 'Oro'][mockTrustLevel%3]}
                </div>
            </div>
            <div class="profile-info">
                <div class="profile-header">
                    <h2 class="profile-name">${name.substring(0, 15)}${name.length > 15 ? '...' : ''} ${verifiedIcon}</h2>
                    ${nip05Text}
                </div>
                <div class="wot-stats">
                    <div class="stat">
                        <span class="stat-value">${profile.nip05 ? 99 : mockReality}%</span>
                        <span class="stat-label" data-i18n="reality">${translations[currentLang].reality}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${mockMutuals}</span>
                        <span class="stat-label" data-i18n="mutuals">${translations[currentLang].mutuals}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${mockDistance}km</span>
                        <span class="stat-label" data-i18n="proximity">${translations[currentLang].proximity}</span>
                    </div>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-secondary btn-circle btn-pass-dynamic">✕</button>
                    <button class="btn btn-secondary btn-circle btn-like-dynamic" style="color: var(--success); font-size: 1.5rem; text-shadow: 0 0 10px rgba(50,215,75,0.4);">❤️</button>
                    <button class="btn btn-primary btn-zap-dynamic">
                        <span class="lightning glow">⚡</span> <span data-i18n="zap_btn">${translations[currentLang].zap_btn}</span>
                        <div class="zap-cost"><span data-i18n="cost_label">${translations[currentLang].cost_label}</span> <span>${currentCost}</span> sats</div>
                    </button>
                </div>
            </div>
        `;

        radarStack.appendChild(card);

        const btnPass = card.querySelector('.btn-pass-dynamic');
        const btnLike = card.querySelector('.btn-like-dynamic');
        const btnZap = card.querySelector('.btn-zap-dynamic');

        const doSwipe = (directionClass) => {
            card.style.transition = "transform 0.4s ease, opacity 0.4s ease";
            if (directionClass === 'right') {
                card.style.transform = "translateX(120%) rotate(15deg)";
            } else if (directionClass === 'left') {
                card.style.transform = "translateX(-120%) rotate(-15deg)";
            } else if (directionClass === 'up') {
                card.style.transform = "translateY(-120%) translateX(20%) rotate(5deg)";
            }
            card.style.opacity = "0";
            setTimeout(() => {
                card.remove();
                isRendering = false;
                renderNextProfile();
            }, 400);
        };

        btnPass.addEventListener('click', () => doSwipe('left'));

        btnLike.addEventListener('click', () => {
            btnLike.style.transform = 'scale(1.2)';
            
            if (Math.random() < 0.20) {
                setTimeout(() => {
                    if (typeof window.showMatchModal === 'function') {
                        window.showMatchModal(profile, picture);
                    }
                    doSwipe('right');
                }, 300);
            } else {
                publishNostrLike(profile.pubkeyHex); // REAL NOSTR LIKE!
                setTimeout(() => doSwipe('right'), 200);
            }
        });

        btnZap.addEventListener('click', async () => {
            const costText = card.querySelector('.zap-cost span').innerText.replace(/,/g, '');
            const cost = parseInt(costText);
            
            btnZap.innerHTML = `<span class="lightning glow" style="animation: pulse 1s infinite">⚡</span> Procesando...`;

            try {
                // Generar Invoice Real contra el Backend
                const response = await fetch('/api/zap', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: cost, pubkey: profile.pubkeyHex })
                });
                const data = await response.json();

                if (!response.ok) throw new Error(data.error || 'Error del servidor');
                
                // Simular el flujo de pago con Alby (WebLN) o fallback interno
                if (window.webln && typeof window.webln.sendPayment === 'function') {
                    await window.webln.enable();
                    await window.webln.sendPayment(data.invoice);
                } else if (currentBalance >= cost) {
                    console.log("Invoice generado:", data.invoice);
                    currentBalance -= cost; 
                    walletBalance.innerHTML = `<span class="lightning">⚡</span> ${currentBalance.toLocaleString()} sats`;
                } else {
                    alert(`No tienes saldo interno.\nFinge que pagas este Invoice real de LNbits:\n\n${data.invoice}`);
                    btnZap.innerHTML = `<span class="lightning glow">⚡</span> Zap`;
                    return;
                }

                btnZap.innerHTML = `<span class="lightning glow">⚡</span> Pagado`;
                btnZap.style.borderColor = "var(--success)";
                
                setTimeout(() => {
                    dailyZapsSent++;
                    zapsSentStats.innerText = dailyZapsSent;
                    addMessageToInbox(profile, true, cost); 
                    publishNostrEncryptedDM(profile.pubkeyHex, `¡Me flipa tu perfil en BoltMatch! Te he enviado un Zap de ${cost} sats ⚡️`);
                    doSwipe('up');
                }, 800);
            } catch (err) {
                console.error(err);
                alert("Error generando Zap en LNbits.");
                btnZap.innerHTML = `<span class="lightning glow">⚡</span> Zap`;
            }
        });
    }

    // --- Inbox Logic ---
    const inboxList = document.getElementById('inbox-list');
    let hasMessages = false;

    function addMessageToInbox(profile, isSent, zapAmount) {
        if (!hasMessages) {
            inboxList.innerHTML = ''; // clear empty state
            hasMessages = true;
        }

        let nameStr = (profile.display_name || profile.name || 'Soberano').substring(0, 15);
        let picStr = profile.picture || 'https://images.unsplash.com/photo-1544502062-f82887f03d1c?auto=format&fit=crop&q=80&w=600&h=800';
        if (!picStr.startsWith('http')) picStr = 'https://images.unsplash.com/photo-1544502062-f82887f03d1c?auto=format&fit=crop&q=80&w=600&h=800';

        const msgDiv = document.createElement('div');
        msgDiv.className = isSent ? 'message-item' : 'message-item premium-highlight';
        msgDiv.style.animation = 'fadeIn 0.4s ease-out';
        
                const badgeHtml = isSent ? `<span style="font-size: 0.7rem; color: var(--success); margin-left: auto;">⚡ ${currentLang === 'es' ? 'Enviado' : 'Sent'}</span>` : `<div class="wot-indicator">WoT: ${Math.floor(Math.random()*3)+1} grd</div>`;

        msgDiv.innerHTML = `
            <img src="${picStr}" alt="User" class="avatar" style="object-fit:cover;">
            <div class="message-content">
                <div class="message-title" style="display:flex; align-items:center;">
                    <strong>${nameStr}</strong>
                    <span class="sats-tag" style="margin-left:5px;">⚡ ${zapAmount.toLocaleString()} sats</span>
                    ${badgeHtml}
                </div>
                <p class="message-text" style="margin-top:0.3rem;">"${isSent ? (currentLang === 'es' ? 'Esperando respuesta...' : 'Waiting for response...') : (currentLang === 'es' ? '¡He visto tu perfil en el Radar!' : 'I saw your profile on the Radar!')}"</p>
            </div>
        `;
        
        inboxList.prepend(msgDiv);
        
        // Update nav badge
        if (!isSent) {
            const badgeNode = document.querySelector('.nav-item[data-target="view-inbox"] .badge');
            if (badgeNode) badgeNode.innerText = (parseInt(badgeNode.innerText) || 0) + 1;
        }
    }

    function connectToRadarRelay() {
        const relayUrls = ['wss://relay.damus.io', 'wss://nos.lol'];
        
        // --- Inject MOCK Profiles for Demo since #boltmatch is strict ---
        profileQueue.push({
            pubkeyHex: "boltmatch1mock", name: "Satoshi (Demo)", gender: "m",
            picture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
            about: "Probando #boltmatch desde Madrid", nip05: "satoshi@boltmatch.org"
        });
        profileQueue.push({
            pubkeyHex: "boltmatch2mock", name: "Halina (Demo)", gender: "f",
            picture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
            about: "Bitcoin y minimalismo. #boltmatch", nip05: "halina@boltmatch.org"
        });
        profileQueue.push({
            pubkeyHex: "boltmatch3mock", name: "Adam (Demo)", gender: "m",
            picture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
            about: "Cypherpunk ⚡ #boltmatch"
        });
        if (!isRendering) renderNextProfile();
        // -----------------------------------------------------------------
        
        // Simulate a surprise incoming zap after 10s of being in the app
        setTimeout(() => {
            if (profileQueue.length > 5) {
                addMessageToInbox(profileQueue[3], false, 105);
            }
        }, 10000);

        relayUrls.forEach(url => {
            try {
                const ws = new WebSocket(url);
                ws.onopen = () => {
                    console.log("Connected to", url);
                    const subId = "boltmatch-" + Math.floor(Math.random() * 100000);
                    
                    // Subscribe to 1. Profiles (#boltmatch) and 2. Likes tagging US
                    let filters = [{ kinds: [0], limit: 40 }];
                    
                    const myHex = localStorage.getItem('boltmatch_pubkey_hex');
                    if (myHex) {
                        filters.push({ kinds: [7], "#p": [myHex] });
                    }
                    
                    ws.send(JSON.stringify(["REQ", subId, ...filters]));
                };
                
                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data[0] === "EVENT") {
                        const nostrEvent = data[2];
                        
                        // Handle Profile (Kind 0)
                        if (nostrEvent.kind === 0) {
                            try {
                                const profileInfo = JSON.parse(nostrEvent.content);
                                if (profileInfo.picture && profileInfo.name && !profileInfo.name.toLowerCase().includes('bot')) {
                                    profileInfo.pubkeyHex = nostrEvent.pubkey;
                                    
                                    let guessedGender = 'hombres';
                                    const aboutText = (profileInfo.about || '').toLowerCase();
                                    if (!aboutText.includes('#boltmatch')) return;
                                    
                                    if (profileInfo.gender && profileInfo.gender.toLowerCase() === 'f') guessedGender = 'mujeres';
                                    
                                    if (guessedGender === userSeekingPref) {
                                        if(!profileQueue.find(p => p.pubkeyHex === nostrEvent.pubkey)) {
                                             profileQueue.push(profileInfo);
                                             if (!isRendering) renderNextProfile();
                                        }
                                    }
                                }
                            } catch(e) {}
                        }
                        
                        // Handle Reciprocal Like (Kind 7)
                        if (nostrEvent.kind === 7) {
                            console.log("Incoming Like detected from:", nostrEvent.pubkey);
                            // Check if WE liked THEM (locally stored)
                            const myLikes = JSON.parse(localStorage.getItem('boltmatch_out_likes') || "[]");
                            if (myLikes.includes(nostrEvent.pubkey)) {
                                console.log("BINGO! Mutual Match with:", nostrEvent.pubkey);
                                // Trigger Match UI
                                const matchProfile = { pubkeyHex: nostrEvent.pubkey, name: "Recomendado" };
                                window.showMatchModal(matchProfile, "https://api.dicebear.com/7.x/avataaars/svg?seed=" + nostrEvent.pubkey);
                            }
                        }
                    }
                };
            } catch(e) { console.error("Relay connection error", e); }
        });
    }

    // --- Real Nostr "Like" (Kind 7) Broadcast ---
    async function publishNostrLike(targetPubkeyHex) {
        if (!window.nostr && !localStorage.getItem('boltmatch_nsec')) {
             console.log("No identity found. Like is local-only.");
             return;
        }
        
        // Track our likes locally for reciprocal check
        const myLikes = JSON.parse(localStorage.getItem('boltmatch_out_likes') || "[]");
        if (!myLikes.includes(targetPubkeyHex)) {
            myLikes.push(targetPubkeyHex);
            localStorage.setItem('boltmatch_out_likes', JSON.stringify(myLikes));
        }

        try {
            let event = {
                kind: 7,
                created_at: Math.floor(Date.now() / 1000),
                tags: [["p", targetPubkeyHex], ["t", "boltmatch-like"]],
                content: "❤️"
            };

            let signedEvent;
            if (window.nostr) {
                signedEvent = await window.nostr.signEvent(event);
            } else {
                const nsec = localStorage.getItem('boltmatch_nsec');
                // Use NostrTools to sign with local nsec
                const sk = window.NostrTools.nip19.decode(nsec).data;
                const pk = window.NostrTools.getPublicKey(sk);
                event.pubkey = pk;
                signedEvent = window.NostrTools.finalizeEvent(event, sk);
            }

            const relayUrls = ['wss://relay.damus.io', 'wss://nos.lol'];
            relayUrls.forEach(url => {
                const ws = new WebSocket(url);
                ws.onopen = () => {
                    ws.send(JSON.stringify(["EVENT", signedEvent]));
                    setTimeout(() => ws.close(), 1000);
                };
            });
            console.log("✅ Like real publicado en Nostr.");
        } catch(e) { console.error("Error publishing like:", e); }
    }

    // --- NIP-04/44 Crypto Engine (Mensajería Cifrada Directa) ---
    async function publishNostrEncryptedDM(targetPubkeyHex, message) {
        if (!window.nostr || typeof window.nostr.nip04 === 'undefined') {
            alert("🔒 Integración Real: Para cifrar y publicar un mensaje privado necesitas usar una extensión NIP-07 (como Alby o nos2x). Actualmente estás simulando de forma local.");
            return;
        }
        
        if (targetPubkeyHex.includes('mock')) {
            console.log("Este es un perfil de prueba, simulando el envío de mensaje al éter.");
            return;
        }

        try {
            console.log("Cifrando mensaje vía extensión NIP-07...");
            const ciphertext = await window.nostr.nip04.encrypt(targetPubkeyHex, message);
            const myPubkey = await window.nostr.getPublicKey();
            
            let event = {
                kind: 4,
                pubkey: myPubkey,
                created_at: Math.floor(Date.now() / 1000),
                tags: [["p", targetPubkeyHex]],
                content: ciphertext
            };

            const signedEvent = await window.nostr.signEvent(event);
            
            console.log("Publicando evento directo a los relays...");
            const relayUrls = ['wss://relay.damus.io', 'wss://nos.lol'];
            relayUrls.forEach(url => {
                try {
                    const ws = new WebSocket(url);
                    ws.onopen = () => {
                        ws.send(JSON.stringify(["EVENT", signedEvent]));
                        // Cerrar para no agotar recursos tras enviar
                        setTimeout(() => ws.close(), 2000); 
                    };
                } catch(e) { console.error("Error broadcast relay:", e); }
            });
            
            console.log(`✅ Mensaje encriptado publicado correctamente en Nostr.`);
        } catch (err) {
            console.error(err);
            alert("Fallo al firmar o encriptar el evento.");
        }
    }

    // --- Match Modal Logic ---
    const matchModal = document.getElementById('match-modal');
    const matchName = document.getElementById('match-name');
    const theirMatchAvatar = document.getElementById('their-match-avatar');
    const btnMatchChat = document.getElementById('btn-match-chat');
    const btnMatchKeep = document.getElementById('btn-match-keep');
    
    let currentMatchProfile = null;

    window.showMatchModal = function(profile, picture) {
        currentMatchProfile = profile;
        if (matchName) matchName.innerText = (profile.display_name || profile.name || 'Soberano').substring(0, 15);
        if (theirMatchAvatar) theirMatchAvatar.src = picture;
        
        if (matchModal) {
            matchModal.style.display = 'flex';
        }
    };

    if (btnMatchKeep) {
        btnMatchKeep.addEventListener('click', () => {
            matchModal.style.display = 'none';
            currentMatchProfile = null;
        });
    }

    if (btnMatchChat) {
        btnMatchChat.addEventListener('click', () => {
            matchModal.style.display = 'none';
            if (currentMatchProfile) {
                // Free Match uses 0 cost and gets added to inbox
                addMessageToInbox(currentMatchProfile, false, 0); 
                publishNostrEncryptedDM(currentMatchProfile.pubkeyHex, "¡Hemos hecho Match mutuamente en BoltMatch! 😍");
            }
            currentMatchProfile = null;
            
            // Navigate to inbox automatically
            document.querySelector('.nav-item[data-target="view-inbox"]').click();
        });
    }

    // --- QR Protocol (Real) ---
    const btnGenerateQR = document.getElementById('btn-generate-qr');
    const modalQR = document.getElementById('qr-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnShowQR = document.getElementById('btn-show-qr');
    const btnScanQR = document.getElementById('btn-scan-qr');
    const qrViewSection = document.getElementById('qr-view-section');
    const qrScanSection = document.getElementById('qr-scan-section');
    
    let qrCodeObj = null;
    let html5QrcodeScanner = null;

    if (btnGenerateQR) {
        btnGenerateQR.addEventListener('click', async () => {
            if (modalQR) modalQR.style.display = 'flex';
            
            let myPubkey = "anon";
            if (window.nostr) {
                try { myPubkey = await window.nostr.getPublicKey(); } catch(e){}
            } else if (localStorage.getItem('boltmatch_pubkey')) {
                myPubkey = localStorage.getItem('boltmatch_pubkey');
            }

            const qrUri = `nostr:${myPubkey}`;
            
            if (!qrCodeObj && typeof QRCode !== 'undefined') {
                const outNode = document.getElementById("qrcode-out");
                if (outNode) outNode.innerHTML = "";
                qrCodeObj = new QRCode("qrcode-out", {
                    text: qrUri,
                    width: 200,
                    height: 200,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
            }
        });
    }

    if (btnShowQR) {
        btnShowQR.addEventListener('click', () => {
            qrViewSection.style.display = 'block';
            qrScanSection.style.display = 'none';
            btnShowQR.className = 'btn btn-primary';
            btnScanQR.className = 'btn btn-secondary';
            
            if (html5QrcodeScanner) {
                html5QrcodeScanner.clear().catch(e => console.error(e));
                html5QrcodeScanner = null;
            }
        });
    }

    if (btnScanQR) {
        btnScanQR.addEventListener('click', () => {
            qrViewSection.style.display = 'none';
            qrScanSection.style.display = 'block';
            btnShowQR.className = 'btn btn-secondary';
            btnScanQR.className = 'btn btn-primary';

            if (!html5QrcodeScanner && typeof Html5QrcodeScanner !== 'undefined') {
                html5QrcodeScanner = new Html5QrcodeScanner(
                    "reader", { fps: 10, qrbox: {width: 250, height: 250} }, false);
                    
                html5QrcodeScanner.render(async (decodedText, decodedResult) => {
                    console.log(`Scan result: ${decodedText}`);
                    let targetPubkey = decodedText.replace('nostr:', '').trim(); 
                    
                    html5QrcodeScanner.clear().catch(e => console.error(e));
                    modalQR.style.display = 'none';
                    html5QrcodeScanner = null;
                    
                    alert(`🎉 Le acabas de dar tu Sello Wingman a: ${targetPubkey.substring(0,8)}...`);
                    
                    if (window.nostr) {
                        try {
                           const pubkey = await window.nostr.getPublicKey();
                           let event = {
                               kind: 1, 
                               pubkey: pubkey,
                               created_at: Math.floor(Date.now() / 1000),
                               tags: [["p", targetPubkey], ["t", "boltmatch-endorsement"]],
                               content: `Tuvimos una cita, ¡muy buena vibra! Endoso (Wingman) verificado físicamente para nostr:${targetPubkey}`
                           };
                           let signedEvent = await window.nostr.signEvent(event);
                           const ws = new WebSocket('wss://relay.damus.io');
                           ws.onopen = () => { 
                               ws.send(JSON.stringify(["EVENT", signedEvent])); 
                               setTimeout(()=>ws.close(), 1000); 
                           };
                           alert("✅ Endoso Wingman publicado criptográficamente en Nostr.");
                        } catch(e) { console.error(e); }
                    }
                }, (errorMessage) => {
                    // Ignore background scan errors
                });
            }
        });
    }

    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            if (modalQR) modalQR.style.display = 'none';
            if (html5QrcodeScanner) {
                html5QrcodeScanner.clear().catch(e => console.error(e));
                html5QrcodeScanner = null;
            }
            
            if (qrViewSection) qrViewSection.style.display = 'block';
            if (qrScanSection) qrScanSection.style.display = 'none';
            if (btnShowQR) btnShowQR.className = 'btn btn-primary';
            if (btnScanQR) btnScanQR.className = 'btn btn-secondary';
        });
    }

    // --- Edit Profile Logic ---
    const editModal = document.getElementById('edit-modal');
    const btnEditProfile = document.getElementById('btn-edit-profile');
    const btnCloseEdit = document.getElementById('btn-close-edit');
    const btnSaveProfile = document.getElementById('btn-save-profile');
    const inputPhoto = document.getElementById('photo-upload');
    const myProfilePic = document.getElementById('my-profile-pic');
    
    const editName = document.getElementById('edit-name');
    const editBio = document.getElementById('edit-bio');
    const bioDisplay = document.getElementById('profile-bio-display');

    if (btnEditProfile) {
        btnEditProfile.addEventListener('click', () => {
            const profile = JSON.parse(localStorage.getItem('boltmatch_profile') || "{}");
            editName.value = profile.name || "";
            editBio.value = profile.bio || "";
            editModal.style.display = 'flex';
        });
    }

    if (btnCloseEdit) btnCloseEdit.addEventListener('click', () => editModal.style.display = 'none');

    if (myProfilePic) {
        myProfilePic.addEventListener('click', () => inputPhoto.click());
    }

    if (inputPhoto) {
        inputPhoto.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);

            myProfilePic.style.opacity = '0.5';
            
            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                if (data.status === 'success') {
                    myProfilePic.src = data.url;
                    // Update local profile
                    const profile = JSON.parse(localStorage.getItem('boltmatch_profile') || "{}");
                    profile.picture = data.url;
                    localStorage.setItem('boltmatch_profile', JSON.stringify(profile));
                }
            } catch (err) {
                console.error(err);
                alert("Error al subir la imagen.");
            } finally {
                myProfilePic.style.opacity = '1';
            }
        });
    }

    if (btnSaveProfile) {
        btnSaveProfile.addEventListener('click', async () => {
            const profile = JSON.parse(localStorage.getItem('boltmatch_profile') || "{}");
            profile.name = editName.value;
            profile.bio = editBio.value;
            localStorage.setItem('boltmatch_profile', JSON.stringify(profile));
            
            // Sync UI
            document.getElementById('profile-name-display').innerText = profile.name;
            bioDisplay.innerText = profile.bio;
            editModal.style.display = 'none';
            
            // Publish to Nostr
            publishNostrMetadata(JSON.stringify(profile));
        });
    }

    // --- Manual Login Handler ---
    const btnLoginManual = document.getElementById('btn-login-manual');
    const inputMnemonic = document.getElementById('login-mnemonic');

    if (btnLoginManual) {
        btnLoginManual.addEventListener('click', async () => {
            const input = (inputMnemonic.value || "").trim();
            if (!input) return alert("Por favor, introduce tu frase o nsec.");

            try {
                let nsec = "";
                let pubkeyHex = "";

                // Case 1: nsec direct input
                if (input.startsWith('nsec1')) {
                    nsec = input;
                    const decoded = window.NostrTools.nip19.decode(nsec);
                    pubkeyHex = window.NostrTools.getPublicKey(decoded.data);
                } 
                // Case 2: 12 words (or other mnemonic length)
                else {
                    const words = input.toLowerCase().split(/\s+/).filter(w => w.length > 0);
                    if (words.length < 12) {
                        return alert("La frase debe tener al menos 12 palabras.");
                    }

                    // Client-side derivation matching the Python server backend:
                    // 1. Mnemonic to Seed
                    // 2. SHA256 of Seed = Private Key
                    const mnemonic = words.join(' ');
                    const seedBuffer = await window.bip39.mnemonicToSeed(mnemonic);
                    
                    // SHA256 of seed to get the hex private key (as done in app.py)
                    const hashBuffer = await crypto.subtle.digest('SHA-256', seedBuffer);
                    const hashArray = Array.from(new Uint8Array(hashBuffer));
                    const skHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                    
                    nsec = window.NostrTools.nip19.nsecEncode(skHex);
                    pubkeyHex = window.NostrTools.getPublicKey(skHex);
                }

                if (nsec && pubkeyHex) {
                    localStorage.setItem('boltmatch_nsec', nsec);
                    localStorage.setItem('boltmatch_pubkey_hex', pubkeyHex);
                    localStorage.setItem('boltmatch_pubkey', window.NostrTools.nip19.npubEncode(pubkeyHex));
                    doLogin(window.NostrTools.nip19.npubEncode(pubkeyHex));
                }
            } catch (err) {
                console.error(err);
                alert("Error procesando las claves. Verifica que sean correctas.");
            }
        });
    }

    // --- Login & Onboarding Logic ---
    const loginOverlay = document.getElementById('login-overlay');
    const onboardingOverlay = document.getElementById('onboarding-overlay');
    const onboardingForm = document.getElementById('onboarding-form');
    const btnNip07 = document.getElementById('btn-nip07');
    const btnRegisterEmail = document.getElementById('btn-register-email');
    const regEmailInput = document.getElementById('reg-email');
    const loginStatus = document.getElementById('login-status');
    const pubkeyDisplay = document.querySelector('.pubkey-display');
    
    let pendingPubkey = null;

    // Login via Email Registration
    if (btnRegisterEmail) {
        btnRegisterEmail.addEventListener('click', async () => {
            const email = regEmailInput.value;
            if (!email) return alert("Por favor, introduce un email válido.");
            
            const defaultRegisterLabel = translations[currentLang]?.btn_register_email || "Generar & Enviar por Email";
            btnRegisterEmail.innerText = translations[currentLang]?.wait_keys || "⏳ Generando claves...";
            btnRegisterEmail.disabled = true;

            try {
                const res = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
                let data = {};
                try {
                    data = await res.json();
                } catch (_parseErr) {
                    // Keep a controlled error message when backend returns non-JSON
                }
                
                if (!res.ok) {
                    throw new Error(data.error || `HTTP ${res.status}`);
                }
                
                if (data.status === 'success' || data.status === 'debug') {
                    loginStatus.innerText = currentLang === 'es' ? "📧 Claves enviadas. Revisa tu bandeja de entrada." : "📧 Keys sent. Check your inbox.";
                    if (data.debug_link) {
                        console.log("DEBUG MAGIC LINK:", data.debug_link);
                        alert(`¡Claves generadas!\n\nMnemonic: ${data.words}\n\nEn un entorno real se envía por email. Usa el enlace de la consola para entrar.`);
                    }
                } else {
                    throw new Error(data.error || "Registro fallido");
                }
            } catch (err) {
                console.error(err);
                alert("Error en el registro: " + err.message);
            } finally {
                btnRegisterEmail.innerText = defaultRegisterLabel;
                btnRegisterEmail.disabled = false;
            }
        });
    }
    
    // Fallback simple npub generating if NostrTools isn't fully loaded yet
    function generateMockKey() {
        const hex = Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
        return "npub1..." + hex.substring(0, 5);
    }

    function proceedToApp(pubkeyText) {
        pubkeyDisplay.innerText = pubkeyText;

        // Populate profile view from local storage
        const profileStr = localStorage.getItem('boltmatch_profile');
        if (profileStr) {
            try {
                const profileObj = JSON.parse(profileStr);
                
                // Set the base coordinate derived from user's ZIP
                if (profileObj.zip) {
                    currentUserLocation = getLatLonFromZip(profileObj.zip);
                }

                if (profileObj.seeking) {
                    userSeekingPref = profileObj.seeking;
                }

                const titleNode = document.getElementById('profile-name-display');
                if (titleNode && profileObj.name) titleNode.innerText = profileObj.name;
                
                if (bioDisplay && profileObj.bio) bioDisplay.innerText = profileObj.bio;
                if (myProfilePic && profileObj.picture) myProfilePic.src = profileObj.picture;

                const dispPref = document.getElementById('display-pref');
                if (dispPref && profileObj.seeking) dispPref.innerText = "Busc. " + profileObj.seeking;
                
                const dispZip = document.getElementById('display-zip');
                if (dispZip && profileObj.zip) dispZip.innerText = "CP: " + profileObj.zip;
            } catch(e) {}
        }

        onboardingOverlay.style.opacity = '0';
        setTimeout(() => {
            onboardingOverlay.style.display = 'none';
            
            // PUBLISH REAL KIND 0 (METADATA) to Nostr
            publishNostrMetadata(localStorage.getItem('boltmatch_profile'));
            
            connectToRadarRelay(); // FETCH REALS NOSTR ACCOUNTS NOW!
        }, 500);
    }
    
    // --- Publish Metadata (Kind 0) ---
    async function publishNostrMetadata(profileStr) {
        if (!profileStr) return;
        const profile = JSON.parse(profileStr);
        
        const metadata = {
            name: profile.name,
            display_name: profile.name,
            about: (profile.bio || '') + ` #boltmatch`,
            picture: profile.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`,
            gender: profile.gender === 'hombre' ? 'm' : 'f'
        };

        try {
            const event = {
                kind: 0,
                created_at: Math.floor(Date.now() / 1000),
                content: JSON.stringify(metadata),
                tags: []
            };

            let signedEvent;
            if (window.nostr) {
                signedEvent = await window.nostr.signEvent(event);
            } else {
                const nsec = localStorage.getItem('boltmatch_nsec');
                if (!nsec) return;
                const sk = window.NostrTools.nip19.decode(nsec).data;
                const pk = window.NostrTools.getPublicKey(sk);
                event.pubkey = pk;
                signedEvent = window.NostrTools.finalizeEvent(event, sk);
            }

            const relayUrls = ['wss://relay.damus.io', 'wss://nos.lol'];
            relayUrls.forEach(url => {
                const ws = new WebSocket(url);
                ws.onopen = () => {
                    ws.send(JSON.stringify(["EVENT", signedEvent]));
                    setTimeout(() => ws.close(), 2000);
                };
            });
            console.log("✅ Perfil publicado en Nostr (Kind 0)");
        } catch(e) { console.error("Error publishing metadata:", e); }
    }

    function doLogin(pubkeyText) {
        loginStatus.innerHTML = "✅ Identidad verificada.";
        pendingPubkey = pubkeyText;
        
        setTimeout(() => {
            loginOverlay.style.opacity = '0';
            setTimeout(() => {
                loginOverlay.style.display = 'none';
                
                // Check if profile is configured
                if (localStorage.getItem('boltmatch_profile')) {
                    proceedToApp(pubkeyText);
                } else {
                    // Show onboarding
                    onboardingOverlay.style.display = 'flex';
                    // Trigger reflow for transition
                    void onboardingOverlay.offsetWidth;
                    onboardingOverlay.style.opacity = '1';
                }
            }, 500);
        }, 500);
    }

    // 1. Try NIP-07 Login
    btnNip07.addEventListener('click', async () => {
        loginStatus.innerText = "Buscando extensión NIP-07...";
        if (window.nostr) {
            try {
                const pubkey = await window.nostr.getPublicKey();
                doLogin("npub..." + pubkey.substring(0,8));
            } catch (err) {
                loginStatus.innerText = "❌ Permiso denegado por el usuario.";
            }
        } else {
            loginStatus.innerText = "❌ No se detectó ninguna extensión Nostr (Alby, nos2x).";
        }
    });

    // 2. Magic Link Check (Automatic)
    if (localStorage.getItem('boltmatch_nsec')) {
        const nsec = localStorage.getItem('boltmatch_nsec');
        try {
            const sk = window.NostrTools.nip19.decode(nsec).data;
            const pk = window.NostrTools.getPublicKey(sk);
            const npub = window.NostrTools.nip19.npubEncode(pk);
            localStorage.setItem('boltmatch_pubkey', npub);
            localStorage.setItem('boltmatch_pubkey_hex', pk);
            localStorage.setItem('boltmatch_logged_in', 'true');
            doLogin(npub);
        } catch(e) { console.error("Invalid nsec in storage", e); }
    }

    // --- Opt-in Toggle Logic ---
    const toggleOptin = document.getElementById('toggle-optin');
    if (toggleOptin) {
        toggleOptin.addEventListener('click', () => {
            const isActive = toggleOptin.classList.contains('active');
            if (isActive) {
                toggleOptin.classList.remove('active');
                toggleOptin.innerText = 'Inactivo';
                alert('Has eliminado la etiqueta #boltmatch de tu metadata Nostr. Ya no aparecerás en el Radar de nadie (GHOST MODE), pero tus mensajes e historial intactos.');
            } else {
                toggleOptin.classList.add('active');
                toggleOptin.innerText = 'Activo';
                alert('Firmando evento en Nostr: Se ha añadido #boltmatch a tu biografía. ¡Vuelves a ser visible en el ecosistema!');
            }
        });
    }

    // --- Onboarding Form Logic ---
    // Toggle Groups
    document.querySelectorAll('.toggle-group').forEach(group => {
        const btns = group.querySelectorAll('.toggle-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    });

    onboardingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('ob-name').value;
        const zip = document.getElementById('ob-zip').value;
        const bio = document.getElementById('ob-bio').value;
        const gender = document.querySelector('#group-gender .active')?.getAttribute('data-val') || 'hombre';
        const seeking = document.querySelector('#group-seeking .active')?.getAttribute('data-val') || 'hombres';
        
        const profile = { name, zip, bio, gender, seeking, picture: (myProfilePic ? myProfilePic.src : null) };
        localStorage.setItem('boltmatch_profile', JSON.stringify(profile));
        
        const bioDisp = document.getElementById('profile-bio-display');
        if (bioDisp) bioDisp.innerText = bio;
        
        proceedToApp(pendingPubkey);
    });

    // --- Auto-login Check ---
    if (localStorage.getItem('boltmatch_nsec') || localStorage.getItem('boltmatch_logged_in')) {
        const npub = localStorage.getItem('boltmatch_pubkey') || generateMockKey();
        loginOverlay.style.display = 'none';
        
        if (localStorage.getItem('boltmatch_profile')) {
            proceedToApp(npub);
        } else {
            onboardingOverlay.style.display = 'flex';
            onboardingOverlay.style.opacity = '1';
        }
    }

});
