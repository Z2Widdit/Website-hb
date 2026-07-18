const MOD_REQUEST_ENDPOINT = '/api/mod-request';
        const DISCORD_INVITE_CODE = 'Baqd8PqY58';
        const DISCORD_GUILD_ID = '761645575077625916';
        const DISCORD_BOT_KEYWORDS = ['disboard', 'discohook', 'ticket tool', 'ticket'];

        // Stats counters
        function animateStats() {
            const stats = [
                { id: 'download-stat', target: 55200, suffix: 'k', divisor: 1000 },
                { id: 'member-stat', target: 500, suffix: '+', divisor: 1 }
            ];
            
            stats.forEach(stat => {
                const el = document.getElementById(stat.id);
                if (!el) return;
                
                let current = 0;
                const increment = Math.ceil(stat.target / 75);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= stat.target) {
                        clearInterval(timer);
                        if (stat.suffix === 'k') {
                            el.textContent = (stat.target / stat.divisor).toFixed(1) + 'k';
                        } else if (stat.suffix === '+') {
                            el.textContent = stat.target + '+';
                        } else {
                            el.textContent = stat.target.toLocaleString();
                        }
                    } else {
                        if (stat.suffix === 'k') {
                            el.textContent = (current / stat.divisor).toFixed(1) + 'k';
                        } else if (stat.suffix === '+') {
                            el.textContent = Math.min(current, stat.target) + '+';
                        } else {
                            el.textContent = current.toLocaleString();
                        }
                    }
                }, 30);
            });
        }

        // Mod data (based on Modland profile)
        const mods = [
            {
                id: 1,
                title: "Enkei Tuner Series Wheel Pack",
                category: "beamng",
                downloads: 203,
                likes: 1,
                date: "2 months ago",
                image: "https://temp2.modland.net/i/69c659319fa42/pn1-md_modland.jpg",
                link: "https://ko-fi.com/s/4c329c78d8",
                desc: "High quality Enkei Tuner Series wheels. Detailed rims with multiple offsets and fitments for BeamNG.drive 0.38.x.",
                paid: true
            },
            {
                id: 2,
                title: "Designer Wheel Pack",
                category: "beamng",
                downloads: 696,
                likes: 2,
                date: "3 months ago",
                image: "https://temp2.modland.net/i/69995830dbd17/wheelz-shuttle-lg-modland-1-md_modland.jpg",
                link: "https://ko-fi.com/s/8a6537a83e",
                desc: "Premium Designer wheel pack featuring modern designs. Clean and stylish wheels that look incredible on many vehicles.",
                paid: true
            },
            {
                id: 3,
                title: "Asanti Wheel Pack",
                category: "beamng",
                downloads: 3553,
                likes: 11,
                date: "4 months ago",
                image: "https://temp2.modland.net/i/6985db1b020c5/as11-md_modland.jpg",
                link: "https://ko-fi.com/s/a19d26103a",
                desc: "Popular Asanti Wheel Pack. Multiple designs included with detailed spokes and finishes. One of the top downloaded packs.",
                paid: true
            },
            {
                id: 4,
                title: "Artis Forged Apex Series III",
                category: "beamng",
                downloads: 93,
                likes: 4,
                date: "5 months ago",
                image: "https://temp2.modland.net/i/695e80af7cc6e/screenshot-2026-01-09-16-59-53-md_modland.jpg",
                link: "https://ko-fi.com/s/1158729598",
                desc: "Artis Forged Apex Series III. Forged style wheels with aggressive styling and incredible attention to detail.",
                paid: true
            },
            {
                id: 5,
                title: "Enkei TSR-X Wheel Pack",
                category: "beamng",
                downloads: 2437,
                likes: 3,
                date: "7 months ago",
                image: "https://temp2.modland.net/i/6920950d86a6e/screenshot-2025-11-26-14-40-21-md_modland.jpg",
                link: "https://www.modland.net/beamng.drive-mods/other/enkei-tsr-x-wheel-pack.html",
                desc: "Enkei TSR-X wheels. Super popular lightweight racing wheel design. 3.84 MB of high quality models.",
                paid: false
            },
            {
                id: 6,
                title: "Klutch-SL2 Wheel Pack",
                category: "beamng",
                downloads: 283,
                likes: 5,
                date: "7 months ago",
                image: "https://temp2.modland.net/i/6920950d86a6e/screenshot-2025-11-24-11-23-20-md_modland.jpg",
                link: "https://ko-fi.com/fivestarrcust0mz",
                desc: "Klutch-SL2 wheels. Clean, modern SL style rims. Multiple color options and perfect for stance and show builds.",
                paid: true
            },
            {
                id: 7,
                title: "Midnight Wheel Pack",
                category: "beamng",
                downloads: 58,
                likes: 5,
                date: "7 months ago",
                image: "https://temp2.modland.net/i/6920950d86a6e/6923bb90e33a9/screenshot-2025-11-22-19-01-47-md_modland.jpg",
                link: "https://ko-fi.com/s/1e39ea9413",
                desc: "Midnight series wheel pack. Dark theme wheels with incredible fitment and detail. Perfect for night cruising.",
                paid: true
            },
            {
                id: 8,
                title: "Artis Forged Apex Series I",
                category: "beamng",
                downloads: 20,
                likes: 2,
                date: "6 months ago",
                image: "https://temp2.modland.net/i/6920950d86a6e/6930bd9b37967/screenshot-2025-12-03-13-56-47-md_modland.jpg",
                link: "https://ko-fi.com/s/f252d852e2",
                desc: "The original Artis Forged Apex Series I. Bold forged-look wheels that stand out on any build.",
                paid: true
            }
        ];

        const paidModTitles = [
            "Enkei Tuner Series Wheel Pack",
            "Designer Wheel Pack",
            "Asanti Wheel Pack",
            "Artis Forged Apex Series III",
            "Midnight Wheel Pack",
            "Artis Forged Apex Series I"
        ];

        // Render mod cards
        function renderMods(filteredMods = mods) {
            const grid = document.getElementById('mod-grid');
            grid.innerHTML = '';
            
            filteredMods.forEach(mod => {
                const card = document.createElement('div');
                card.className = `mod-card glass rounded-3xl overflow-hidden border border-white/10 cursor-pointer`;
                card.innerHTML = `
                    <div class="relative overflow-hidden h-[180px]">
                        <img src="${mod.image}" class="mod-image mod-image-fallback w-full h-full object-cover"
                             data-fallback="https://picsum.photos/id/1015/600/400" alt="${mod.title}">
                        ${showDollarSign ? `<div class="absolute top-3 left-3 text-3xl font-black text-yellow-400 drop-shadow-lg mod-paid-badge">$</div>` : ''}
                        <div class="absolute top-3 right-3 px-3 py-1 text-[10px] font-semibold rounded-full bg-black/70 backdrop-blur flex items-center gap-1">
                            <i class="fa-solid fa-download text-[10px]"></i> 
                            <span>${mod.downloads.toLocaleString()}</span>
                        </div>
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 h-16"></div>
                    </div>
                    <div class="p-5">
                        <div class="flex justify-between items-start">
                            <div class="font-semibold leading-tight tracking-tight pr-1">${mod.title}</div>
                            <div class="text-xs flex items-center text-amber-400 flex-shrink-0">
                                <i class="fa-solid fa-heart mr-1"></i>${mod.likes}
                            </div>
                        </div>
                        <div class="flex items-center justify-between mt-4">
                            <div>
                                <div class="text-xs text-white/60">${mod.date}</div>
                                <div class="uppercase text-[10px] font-bold tracking-wider text-[#c084fc] mt-0.5">BeamNG.drive</div>
                            </div>
                            <button data-action="view-mod" data-mod-id="${mod.id}" 
                                    class="text-xs px-4 py-1.5 rounded-2xl bg-white/10 hover:bg-white/20 font-medium transition">View</button>
                        </div>
                    </div>
                `;
                
                card.addEventListener('click', (e) => {
                    if (e.target instanceof Element && e.target.closest('[data-action="view-mod"]')) return;
                    viewMod(mod.id);
                });
                grid.appendChild(card);
            });
        }

        // Filter mods
        let currentFilter = 'all';
        let showDollarSign = false;
        
        function filterMods(filter) {
            currentFilter = filter;
            
            // Toggle active buttons
            document.querySelectorAll('.mod-filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.filter === filter) {
                    btn.classList.add('active');
                }
            });
            
            let filtered = mods;
            showDollarSign = (filter === 'paid');
            
            if (filter === 'paid') {
                filtered = mods.filter(m => paidModTitles.includes(m.title));
            } else if (filter === 'free') {
                filtered = mods.filter(m => !paidModTitles.includes(m.title));
            }
            
            renderMods(filtered);
        }

        let currentMod = null;
        
        function viewMod(modId) {
            const mod = mods.find(m => m.id === modId);
            if (!mod) return;
            
            currentMod = mod;
            
            // Populate modal
            document.getElementById('modal-title').textContent = mod.title;
            document.getElementById('modal-description').textContent = mod.desc;
            document.getElementById('modal-category').innerHTML = `<span class="text-white/80">BEAMNG.drive • ${mod.date}</span>`;

            // Dynamic button text for paid vs free
            const downloadBtn = document.getElementById('modal-download-btn');
            const btnSpan = downloadBtn.querySelector('span');
            if (mod.paid) {
                btnSpan.textContent = 'Get on Ko-fi';
            } else {
                btnSpan.textContent = 'View on ModLand';
            }
            
            const stats = document.getElementById('modal-stats');
            stats.innerHTML = `
                <div class="flex justify-end items-center gap-2 text-sm">
                    <div><span class="font-medium">${mod.downloads.toLocaleString()}</span> <span class="text-white/50">dl</span></div>
                    <div class="text-amber-400"><i class="fa-solid fa-heart"></i> ${mod.likes}</div>
                </div>
            `;
            
            const imageDiv = document.getElementById('modal-image');
            imageDiv.style.backgroundImage = `url('${mod.image}')`;
            imageDiv.style.backgroundSize = 'cover';
            imageDiv.style.backgroundPosition = 'center';
            
            // Show modal
            document.getElementById('mod-modal').classList.remove('hidden');
            document.getElementById('mod-modal').classList.add('flex');
        }
        
        function closeModModal(ev, force = false) {
            if (force || !ev || (ev.target && ev.target.id === 'mod-modal')) {
                const modal = document.getElementById('mod-modal');
                if (!modal) return;
                modal.classList.remove('flex');
                modal.classList.add('hidden');
            }
        }
        
        function downloadMod() {
            if (!currentMod) return;
            window.open(currentMod.link, '_blank');
            
            // Small interaction bonus
            const toastMsg = currentMod.paid ? "Opening Ko-fi..." : "Opening ModLand page...";
            showToast(toastMsg, true);
            
            // Increment local download stat on this site
            setTimeout(() => {
                const statEl = document.getElementById('download-stat');
                if (statEl) {
                    let num = parseFloat(statEl.textContent);
                    num = num + 0.1;
                    statEl.textContent = num.toFixed(1) + 'k';
                }
            }, 1100);
        }
        
        function favoriteMod() {
            if (!currentMod) return;
            showToast(`Added ${currentMod.title} to favorites ❤️`);
            
            // Add to local storage favorites (demo)
            let favs = JSON.parse(localStorage.getItem('fsc_favs') || '[]');
            if (!favs.includes(currentMod.id)) {
                favs.push(currentMod.id);
                localStorage.setItem('fsc_favs', JSON.stringify(favs));
            }
            
            // Update likes display for visual fun
            currentMod.likes++;
            const stats = document.getElementById('modal-stats');
            if (stats) {
                stats.innerHTML = `
                    <div class="flex justify-end items-center gap-2 text-sm">
                        <div><span class="font-medium">${currentMod.downloads.toLocaleString()}</span> <span class="text-white/50">dl</span></div>
                        <div class="text-amber-400"><i class="fa-solid fa-heart"></i> ${currentMod.likes}</div>
                    </div>
                `;
            }
            
            // Refresh grid in case
            setTimeout(() => {
                const grid = document.getElementById('mod-grid');
                if (grid) {
                    const activeBtn = document.querySelector('.mod-filter-btn.active');
                    if (activeBtn && activeBtn.dataset.filter !== 'all') {
                        filterMods(activeBtn.dataset.filter);
                    } else {
                        renderMods();
                    }
                }
            }, 1600);
        }

        // Platform link handlers (working buttons)
        function openPatreon() {
            window.open('https://www.patreon.com/FiveStarrCust0mz', '_blank');
            showToast("Opening Patreon...");
        }
        
        function openKofi() {
            window.open('https://ko-fi.com/fivestarrcust0mz', '_blank');
            showToast("Opening Ko-fi shop...");
        }
        
        function openModland() {
            window.open('https://www.modland.net/user/fivestarrz2', '_blank');
        }
        
        function escapeHtml(text) {
            return String(text)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function truncateDiscordText(text, max = 26) {
            const value = String(text || '').trim();
            if (value.length <= max) return value;
            return value.slice(0, max - 3) + '...';
        }

        function cleanDiscordChannelName(name) {
            let cleaned = String(name || '').trim();
            if (cleaned.indexOf('★︱') === 0) {
                cleaned = cleaned.slice(2).trim();
            }
            cleaned = cleaned.replace(/[🍃🥘♨⭐➕]/g, '').trim();
            return cleaned || String(name || '');
        }

        function showDiscordIframeWidget() {
            const shell = document.getElementById('discord-widget-shell');
            if (shell) shell.classList.add('is-iframe');
        }

        function showDiscordCustomWidget() {
            const shell = document.getElementById('discord-widget-shell');
            if (shell) shell.classList.remove('is-iframe');
        }

        function shouldUseDiscordIframeWidget() {
            return window.location.protocol === 'file:';
        }

        function isDiscordBot(member) {
            const name = String(member.username || '').toLowerCase();
            return DISCORD_BOT_KEYWORDS.some((keyword) => name.includes(keyword));
        }

        function mapWidgetMember(member) {
            return {
                name: member.username,
                status: member.status || 'online',
                activity: member.game?.name ? truncateDiscordText(member.game.name) : '',
                avatar: member.avatar_url || ''
            };
        }

        function sortWidgetMembers(members) {
            return [...members].sort((a, b) => {
                const aPriority = /fivestarr/i.test(a.name) ? 0 : 1;
                const bPriority = /fivestarr/i.test(b.name) ? 0 : 1;
                if (aPriority !== bPriority) return aPriority - bPriority;
                return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
            });
        }

        function renderDiscordWidgetChannels(channels = []) {
            const list = document.getElementById('discord-channel-list');
            if (!list) return;

            if (!channels.length) {
                list.innerHTML = '<div class="discord-channel">Voice Channels</div>';
                return;
            }

            const sorted = [...channels]
                .sort((a, b) => a.position - b.position)
                .slice(0, 3);

            list.innerHTML = sorted.map((channel) =>
                `<div class="discord-channel">${escapeHtml(cleanDiscordChannelName(channel.name))}</div>`
            ).join('');
        }

        function renderDiscordWidgetMembers(members = [], emptyMessage = 'No members online') {
            const list = document.getElementById('discord-members-list');
            if (!list) return;

            if (!members.length) {
                list.innerHTML = `<div class="discord-member"><div class="discord-member-name" class="discord-empty-msg">${escapeHtml(emptyMessage)}</div></div>`;
                return;
            }

            list.innerHTML = members.map((member) => {
                const safeName = escapeHtml(member.name);
                const initials = escapeHtml(member.name.slice(0, 2).toUpperCase());
                const avatar = member.avatar
                    ? `<img src="${escapeHtml(member.avatar)}" alt="" class="discord-member-avatar" loading="lazy">`
                    : `<div class="discord-member-avatar fallback" class="discord-avatar-fallback-bg">${initials}</div>`;

                const activity = member.activity
                    ? `<div class="discord-member-activity">${escapeHtml(member.activity)}</div>`
                    : '';

                const statusClass = ['online', 'idle', 'dnd', 'streaming'].includes(member.status)
                    ? member.status
                    : 'online';

                return `
                    <div class="discord-member">
                        <div class="discord-member-avatar-wrap">
                            ${avatar}
                            <span class="discord-status-dot ${statusClass}"></span>
                        </div>
                        <div class="discord-member-info">
                            <div class="discord-member-name">${safeName}</div>
                            ${activity}
                        </div>
                    </div>
                `;
            }).join('');
        }

        async function refreshDiscordWidget() {
            const countEl = document.getElementById('discord-widget-count');

            try {
                const response = await fetch(`https://discord.com/api/guilds/${DISCORD_GUILD_ID}/widget.json`, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'omit',
                    cache: 'no-store'
                });
                if (!response.ok) throw new Error('Widget fetch failed');

                const data = await response.json();
                const members = sortWidgetMembers(
                    (data.members || [])
                        .filter((member) => !isDiscordBot(member))
                        .map(mapWidgetMember)
                );

                const onlineCount = typeof data.presence_count === 'number'
                    ? data.presence_count
                    : members.length;

                showDiscordCustomWidget();

                if (countEl) {
                    countEl.textContent = `${onlineCount} Members Online`;
                }

                renderDiscordWidgetChannels(data.channels || []);
                renderDiscordWidgetMembers(members);
                return true;
            } catch (err) {
                showDiscordIframeWidget();
                return false;
            }
        }

        function reloadDiscordIframeWidget() {
            const iframe = document.getElementById('discord-widget-iframe');
            if (!iframe) return;

            const baseUrl = `https://discord.com/widget?id=${DISCORD_GUILD_ID}&theme=dark`;
            iframe.src = `${baseUrl}&_=${Date.now()}`;
        }

        function isDiscordPanelUsingIframe() {
            const shell = document.getElementById('discord-widget-shell');
            return shouldUseDiscordIframeWidget() || shell?.classList.contains('is-iframe');
        }

        function refreshDiscordPanel() {
            const btn = document.getElementById('discord-panel-refresh-btn');
            if (btn) {
                btn.disabled = true;
                btn.classList.add('is-spinning');
            }

            const finishRefresh = () => {
                if (btn) {
                    btn.disabled = false;
                    btn.classList.remove('is-spinning');
                }
                showToast('Discord panel refreshed', true);
            };

            if (isDiscordPanelUsingIframe()) {
                showDiscordIframeWidget();
                reloadDiscordIframeWidget();
                setTimeout(finishRefresh, 900);
                return;
            }

            renderDiscordWidgetMembers([], 'Refreshing...');
            const countEl = document.getElementById('discord-widget-count');
            if (countEl) {
                countEl.textContent = 'Refreshing...';
            }

            refreshDiscordWidget()
                .then(finishRefresh)
                .catch(finishRefresh);
        }

        function sitePerfTier() {
            return document.documentElement.dataset.perf || 'high';
        }

        function isTouchLikeDevice() {
            return document.documentElement.dataset.touch === 'true'
                || window.matchMedia('(pointer: coarse)').matches;
        }

        function isLowPerfDevice() {
            return sitePerfTier() === 'low';
        }

        function isMediumPerfDevice() {
            return sitePerfTier() === 'medium';
        }

        function shouldReduceMotionEffects() {
            return isLowPerfDevice()
                || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }

        function shouldReduceHeavyEffects() {
            return isLowPerfDevice() || isMediumPerfDevice() || shouldReduceMotionEffects();
        }

        function runWhenIdle(callback, timeout) {
            if ('requestIdleCallback' in window) {
                window.requestIdleCallback(callback, { timeout: timeout || 1800 });
                return;
            }
            window.setTimeout(callback, 1);
        }

        function optimizeMediaLoading() {
            document.querySelectorAll('#mods img, .mod-card img').forEach((img, index) => {
                img.loading = 'lazy';
                img.decoding = 'async';
                if (index > 6 && 'fetchPriority' in img) {
                    img.fetchPriority = 'low';
                }
            });
        }

        const CONTENT_VIDEO_PEAK_VOLUME = 0.1;
        const CONTENT_VIDEO_FADE_RANGE = 0.95;
        const CONTENT_VIDEO_APPROACH_MAX = 0.38;
        const CONTENT_VIDEO_APPROACH_RANGE = 0.9;
        const CONTENT_VIDEO_CDN_BASE = 'https://media.githubusercontent.com/media/Z2Widdit/Website-hb/main/content/';
        window.contentVideoPlayers = [];

        function shouldUseLocalContentVideos() {
            return ['localhost', '127.0.0.1'].includes(window.location.hostname)
                || window.location.protocol === 'file:';
        }

        function resolveContentVideoSrc(filename) {
            const cleanName = String(filename || '').replace(/^content\//, '');
            if (!cleanName) return '';
            return shouldUseLocalContentVideos()
                ? `content/${cleanName}`
                : `${CONTENT_VIDEO_CDN_BASE}${cleanName}`;
        }

        function applyContentVideoSource(video) {
            const source = video.querySelector('source');
            if (!source) return '';

            const filename = (
                source.getAttribute('src')
                || source.getAttribute('data-pending-filename')
                || source.getAttribute('data-filename')
                || ''
            ).replace(/^content\//, '');
            const resolved = resolveContentVideoSrc(filename);
            if (!resolved) return '';

            source.setAttribute('data-filename', filename);
            source.removeAttribute('data-pending-filename');
            source.src = resolved;
            return resolved;
        }

        function setupLazyContentVideo(player, index) {
            const { video, block } = player;
            const source = video.querySelector('source');
            const filename = (source?.getAttribute('src') || '').replace(/^content\//, '');
            const shouldLazy = video.hasAttribute('data-lazy-content-video')
                || index > 0
                || isLowPerfDevice()
                || isMediumPerfDevice();

            if (!shouldLazy) {
                applyContentVideoSource(video);
                video.preload = isLowPerfDevice() ? 'metadata' : 'auto';
                video.load();
                ensureContentVideoPlaying(video);
                return;
            }

            if (source && filename) {
                source.removeAttribute('src');
                source.setAttribute('data-pending-filename', filename);
            }

            video.preload = 'none';

            const activateVideo = () => {
                applyContentVideoSource(video);
                video.preload = isLowPerfDevice() ? 'metadata' : 'auto';
                video.load();
                ensureContentVideoPlaying(video);
            };

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    if (!entries.some((entry) => entry.isIntersecting)) return;
                    observer.disconnect();
                    activateVideo();
                }, { rootMargin: '300px' });
                observer.observe(block);
                return;
            }

            activateVideo();
        }

        function contentVideoFadeCurve(t) {
            const clamped = Math.max(0, Math.min(1, t));
            return 1 - (1 - clamped) * (1 - clamped);
        }

        function updateContentVolumeIcon(video, icon) {
            if (!icon || !video) return;

            if (video.muted || video.volume === 0) {
                icon.className = 'content-mute-icon fa-solid fa-volume-xmark';
            } else if (video.volume < 0.45) {
                icon.className = 'content-mute-icon fa-solid fa-volume-low';
            } else {
                icon.className = 'content-mute-icon fa-solid fa-volume-high';
            }
        }

        function getContentVideoCenterWeight(center, viewportCenter, fadeRange) {
            const distance = Math.abs(viewportCenter - center);
            return contentVideoFadeCurve(1 - distance / fadeRange);
        }

        function getContentVideoAudioWeight(center, viewportH, viewportCenter, fadeRange) {
            if (center >= 0 && center <= viewportH) {
                return getContentVideoCenterWeight(center, viewportCenter, fadeRange);
            }

            if (center > viewportH) {
                const approachDistance = center - viewportH;
                const approachRange = fadeRange * CONTENT_VIDEO_APPROACH_RANGE;
                if (approachDistance >= approachRange) return 0;
                const approachFactor = contentVideoFadeCurve(1 - approachDistance / approachRange);
                return approachFactor * CONTENT_VIDEO_APPROACH_MAX;
            }

            return 0;
        }

        function updateContentVideoScrollVolume() {
            const players = window.contentVideoPlayers;
            if (!players.length) return;

            const viewportH = window.innerHeight;
            const viewportCenter = viewportH / 2;
            const fadeRange = viewportH * CONTENT_VIDEO_FADE_RANGE;

            const entries = players.map((player) => {
                const rect = (player.frame || player.block).getBoundingClientRect();
                const center = rect.top + rect.height / 2;
                const weight = getContentVideoAudioWeight(center, viewportH, viewportCenter, fadeRange);

                return { player, center, weight };
            });

            const activeEntries = entries.filter((entry) => entry.weight > 0.001);
            const weightTotal = activeEntries.reduce((sum, entry) => sum + entry.weight, 0);
            const crossfade = activeEntries.length > 1;

            entries.forEach(({ player, weight }) => {
                const { video, volumeSlider, muteIcon } = player;
                const peak = video._contentVolumeUserSet
                    ? (video._contentUserPeak ?? CONTENT_VIDEO_PEAK_VOLUME)
                    : CONTENT_VIDEO_PEAK_VOLUME;

                let level = 0;

                if (weight > 0 && weightTotal > 0) {
                    level = crossfade
                        ? peak * (weight / weightTotal)
                        : peak * weight;
                }

                if (video._contentVolumeUserMuted) {
                    video.volume = 0;
                    video.muted = true;
                } else {
                    video.volume = level;
                    video.muted = level <= 0;
                }

                if (volumeSlider && !video._contentVolumeUserSet) {
                    volumeSlider.value = level.toFixed(2);
                }
                updateContentVolumeIcon(video, muteIcon);
            });
        }

        function scheduleContentVideoScrollVolume() {
            if (window._contentVideoScrollRaf) return;
            window._contentVideoScrollRaf = requestAnimationFrame(() => {
                window._contentVideoScrollRaf = null;
                updateContentVideoScrollVolume();
            });
        }

        function ensureContentVideoPlaying(video) {
            const player = window.contentVideoPlayers.find((entry) => entry.video === video);
            if (!video || !video.paused) return;

            video.play().catch(() => {
                if (player?.statusEl) {
                    player.statusEl.textContent = 'Tap anywhere on the page to start playback.';
                }
            });

            player?.wrap?.classList.add('is-playing');
        }

        function ensureAllContentVideosPlaying() {
            window.contentVideoPlayers.forEach(({ video }) => ensureContentVideoPlaying(video));
        }

        function toggleContentMuteForPlayer(player) {
            const { video, volumeSlider, muteIcon } = player;
            if (!video) return;

            video._contentVolumeUserMuted = !video._contentVolumeUserMuted;
            video._contentVolumeUserSet = true;

            if (!video._contentVolumeUserMuted && !video._contentUserPeak) {
                video._contentUserPeak = CONTENT_VIDEO_PEAK_VOLUME;
                if (volumeSlider) volumeSlider.value = String(CONTENT_VIDEO_PEAK_VOLUME);
            }

            scheduleContentVideoScrollVolume();
            updateContentVolumeIcon(video, muteIcon);
        }

        function setContentVolumeForPlayer(player, value) {
            const { video, volumeSlider, muteIcon } = player;
            if (!video) return;

            const level = Math.max(0, Math.min(1, Number(value)));
            video._contentUserPeak = level;
            video._contentVolumeUserMuted = level === 0;
            video._contentVolumeUserSet = true;
            if (volumeSlider) volumeSlider.value = String(level);
            scheduleContentVideoScrollVolume();
            updateContentVolumeIcon(video, muteIcon);
        }

        function toggleContentFullscreenForPlayer(player) {
            const wrap = player?.wrap;
            if (!wrap) return;

            if (!document.fullscreenElement) {
                const request = wrap.requestFullscreen || wrap.webkitRequestFullscreen;
                if (request) request.call(wrap);
            } else {
                const exit = document.exitFullscreen || document.webkitExitFullscreen;
                if (exit) exit.call(document);
            }
        }

        function syncContentFullscreenIcons() {
            window.contentVideoPlayers.forEach(({ fullscreenBtn }) => {
                const icon = fullscreenBtn?.querySelector('i');
                if (!icon) return;
                icon.className = document.fullscreenElement
                    ? 'fa-solid fa-compress'
                    : 'fa-solid fa-expand';
            });
        }

        function initContentVideo() {
            const blocks = document.querySelectorAll('[data-content-player]');
            if (!blocks.length) return;

            window.contentVideoPlayers = [];

            blocks.forEach((block, index) => {
                const video = block.querySelector('.content-cinema-video');
                const wrap = block.querySelector('.content-cinema-video-wrap');
                const frame = block.querySelector('.content-cinema-frame');
                const stage = block.querySelector('.content-player-stage');
                const muteBtn = block.querySelector('.content-mute-btn');
                const volumeSlider = block.querySelector('.content-volume-slider');
                const fullscreenBtn = block.querySelector('.content-fullscreen-btn');
                const statusEl = block.querySelector('.content-video-status');
                const muteIcon = block.querySelector('.content-mute-icon');

                if (!video || !wrap) return;

                const player = { block, video, wrap, frame, stage, muteBtn, volumeSlider, fullscreenBtn, statusEl, muteIcon };
                window.contentVideoPlayers.push(player);

                video.volume = 0;
                video.muted = true;
                updateContentVolumeIcon(video, muteIcon);

                muteBtn?.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleContentMuteForPlayer(player);
                });

                volumeSlider?.addEventListener('input', (e) => {
                    e.stopPropagation();
                    setContentVolumeForPlayer(player, e.target.value);
                });

                volumeSlider?.addEventListener('click', (e) => e.stopPropagation());

                fullscreenBtn?.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleContentFullscreenForPlayer(player);
                });

                video.addEventListener('play', () => {
                    wrap.classList.add('is-playing');
                    stage?.classList.add('is-playing');
                    if (statusEl) statusEl.textContent = 'Now playing — audio follows whichever video is centered.';
                    scheduleContentVideoScrollVolume();
                });

                video.addEventListener('pause', () => {
                    wrap.classList.remove('is-playing');
                    stage?.classList.remove('is-playing');
                    ensureContentVideoPlaying(video);
                });

                video.addEventListener('loadedmetadata', () => ensureContentVideoPlaying(video));
                video.addEventListener('canplay', () => ensureContentVideoPlaying(video));
                video.addEventListener('error', () => {
                    const source = video.querySelector('source');
                    const filename = source?.getAttribute('data-filename') || '';
                    const currentSrc = source?.src || '';

                    if (filename && !shouldUseLocalContentVideos() && !currentSrc.includes('githubusercontent.com')) {
                        if (source) {
                            source.src = `${CONTENT_VIDEO_CDN_BASE}${filename}`;
                            if (statusEl) statusEl.textContent = 'Retrying video from CDN...';
                            video.load();
                            ensureContentVideoPlaying(video);
                            return;
                        }
                    }

                    if (statusEl) statusEl.textContent = 'Video unavailable right now. Refresh and try again.';
                    showToast('Content video could not be loaded.');
                });

                setupLazyContentVideo(player, index);
            });

            document.addEventListener('fullscreenchange', syncContentFullscreenIcons);

            window.addEventListener('scroll', scheduleContentVideoScrollVolume, { passive: true });
            window.addEventListener('resize', scheduleContentVideoScrollVolume, { passive: true });

            document.addEventListener('click', () => {
                ensureAllContentVideosPlaying();
                scheduleContentVideoScrollVolume();
            }, { once: true });

            if ('IntersectionObserver' in window) {
                const revealObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        entry.target.classList.toggle('is-visible', entry.isIntersecting);
                    });
                }, { threshold: 0.15 });

                window.contentVideoPlayers.forEach(({ stage }) => {
                    if (stage) revealObserver.observe(stage);
                });
            }

            scheduleContentVideoScrollVolume();
        }

        function initDiscordWidget() {
            if (window.discordWidgetInterval) {
                clearInterval(window.discordWidgetInterval);
                window.discordWidgetInterval = null;
            }

            if (shouldUseDiscordIframeWidget()) {
                showDiscordIframeWidget();
                return;
            }

            renderDiscordWidgetMembers([], 'Loading members...');
            refreshDiscordWidget().then((loaded) => {
                if (loaded) {
                    window.discordWidgetInterval = setInterval(refreshDiscordWidget, 60000);
                }
            });
        }

        function initDiscordWidgetWhenVisible() {
            const section = document.getElementById('community');
            if (!section || !('IntersectionObserver' in window)) {
                initDiscordWidget();
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return;
                observer.disconnect();
                initDiscordWidget();
            }, { rootMargin: '240px' });

            observer.observe(section);
        }

        function joinDiscord() {
            window.open('https://discord.com/invite/Baqd8PqY58', '_blank');
            
            // Fun interactive effect
            const btns = document.querySelectorAll('button');
            showToast("Opening Discord invite...", true);
            
            // Confetti
            launchConfetti(60);
            
            // Update member stat slightly
            setTimeout(() => {
                const el = document.getElementById('member-stat');
                if (el) {
                    let num = parseInt(el.textContent) || 500;
                    num += Math.floor(Math.random() * 8) + 3; // add a few more members
                    el.textContent = num + '+';
                }
            }, 800);
        }
        
        function copyDiscordLink() {
            navigator.clipboard.writeText('https://discord.gg/Baqd8PqY58').then(() => {
                showToast("Discord link copied to clipboard!");
            }).catch(() => {
                // fallback
                prompt("Copy this link:", "https://discord.gg/Baqd8PqY58");
            });
        }

        // Request form
        function openRequestModal() {
            document.getElementById('request-modal').classList.remove('hidden');
            document.getElementById('request-modal').classList.add('flex');
        }
        
        function closeRequestModal(ev, force = false) {
            if (force || !ev || (ev.target && ev.target.id === 'request-modal')) {
                const modal = document.getElementById('request-modal');
                if (!modal) return;
                modal.classList.remove('flex');
                modal.classList.add('hidden');
            }
        }

        function getTheme() {
            return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        }

        function syncNavLogo(theme) {
            const video = document.getElementById('nav-logo-video');
            if (!video) return;

            if (theme === 'light') {
                video.pause();
            } else {
                video.play().catch(() => {});
            }
        }

        function applyTheme(theme) {
            const next = theme === 'light' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            try {
                localStorage.setItem('fsc-theme', next);
            } catch (e) {}
            syncNavLogo(next);
        }

        function toggleTheme() {
            applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
        }

        let slowScrollFrame = null;

        function getScrollY() {
            return window.pageYOffset || document.documentElement.scrollTop || 0;
        }

        function easeInOutCubic(t) {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function slowScrollTo(targetY, instant) {
            if (slowScrollFrame) {
                cancelAnimationFrame(slowScrollFrame);
                slowScrollFrame = null;
            }

            const startY = getScrollY();
            const goalY = Math.max(0, targetY);
            const distance = Math.abs(goalY - startY);

            if (instant || distance < 2) {
                window.scrollTo(0, goalY);
                return;
            }

            const MIN_DURATION = 400;
            const MAX_DURATION = 1200;
            const duration = Math.min(MAX_DURATION, Math.max(MIN_DURATION, distance * 0.5));
            const startTime = performance.now();

            function step(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeInOutCubic(progress);
                const currentY = startY + (goalY - startY) * eased;

                window.scrollTo(0, currentY);

                if (progress < 1) {
                    slowScrollFrame = requestAnimationFrame(step);
                } else {
                    slowScrollFrame = null;
                    window.scrollTo(0, goalY);
                }
            }

            slowScrollFrame = requestAnimationFrame(step);
        }

        function scrollToHome(event, instant) {
            if (event) event.preventDefault();

            slowScrollTo(0, instant);
            try {
                history.replaceState(null, '', window.location.pathname + window.location.search);
            } catch (e) {}
        }

        function scrollToSection(sectionId, event) {
            if (event) event.preventDefault();

            const section = document.getElementById(sectionId);
            if (!section) return;

            const nav = document.querySelector('nav');
            const navHeight = nav ? nav.offsetHeight : 0;
            const top = section.getBoundingClientRect().top + getScrollY() - navHeight;

            slowScrollTo(top, false);
            try {
                history.replaceState(null, '', `#${sectionId}`);
            } catch (e) {}
        }

        function truncateForDiscord(value, max = 1024) {
            const text = String(value || '').trim();
            if (text.length <= max) return text || '—';
            return text.slice(0, max - 3) + '...';
        }

        async function submitRequest(e) {
            e.preventDefault();

            const form = document.getElementById('request-form');
            const submitBtn = document.getElementById('request-submit-btn');
            if (!form || !submitBtn) return;

            const platform = form.platform.value;
            const details = form.details.value.trim();
            const discord = form.discord.value.trim();

            if (!details) {
                showToast('Please describe what you are looking for.');
                return;
            }

            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="inline-flex items-center justify-center gap-2"><i class="fa-solid fa-spinner fa-spin"></i> Sending...</span>';

            // Never send secrets from the browser — webhook is server-side only.
            const payload = {
                platform,
                discord,
                details,
                // Honeypot fields (must stay empty)
                website: form.website ? form.website.value : '',
                company: form.company ? form.company.value : ''
            };

            try {
                const response = await fetch(MOD_REQUEST_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error('Request failed');
                }

                form.reset();
                closeRequestModal();

                showToast('Request submitted! We will review it on Discord.', true);
                launchConfetti(30);

                setTimeout(() => {
                    const shouldJoin = confirm('Want to get notified in Discord when the creator replies?');
                    if (shouldJoin) joinDiscord();
                }, 1700);
            } catch (err) {
                showToast('Could not send your request. Please try again or open a ticket on Discord.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        }
        
        function simulateCommission() {
            window.open('https://ko-fi.com/fivestarrcust0mz/commissions', '_blank');
            showToast("Opening Ko-fi commissions...");
        }

        // Toast notifications
        function showToast(message, autoClose = true) {
            const container = document.getElementById('toast-container');
            
            const toast = document.createElement('div');
            toast.className = `toast max-w-xs px-5 py-3.5 glass border border-white/10 rounded-2xl flex items-center gap-x-3 shadow-xl text-sm`;
            toast.innerHTML = `
                <div class="flex-1">${message}</div>
                <button class="text-xs px-1.5 text-white/60 hover:text-white">×</button>
            `;
            
            const closeBtn = toast.querySelector('button');
            closeBtn.onclick = () => toast.remove();
            
            container.appendChild(toast);
            
            if (autoClose) {
                setTimeout(() => {
                    if (toast && toast.parentNode) toast.remove();
                }, 3400);
            }
        }

        // Simple confetti
        function launchConfetti(count = 45) {
            const colors = ['#c084fc', '#67e8f9', '#eab308', '#fff'];
            const container = document.body;
            
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = `absolute pointer-events-none text-sm`;
                particle.innerHTML = `<i class="fa-solid fa-star"></i>`;
                particle.style.left = Math.random() * 100 + 'vw';
                particle.style.top = '-10px';
                particle.style.color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.opacity = Math.random() * 0.9 + 0.3;
                particle.style.fontSize = Math.random() * 12 + 10 + 'px';
                particle.style.zIndex = '99';
                particle.style.transition = 'transform 1.8s linear, opacity 1.8s linear';
                
                container.appendChild(particle);
                
                const duration = Math.random() * 1500 + 1900;
                const xDrift = (Math.random() - 0.5) * 200;
                
                setTimeout(() => {
                    particle.style.transform = `translateY(${window.innerHeight + 120}px) translateX(${xDrift}px) rotate(${Math.random()*300 + 80}deg)`;
                    particle.style.opacity = '0';
                }, 20);
                
                setTimeout(() => {
                    particle.remove();
                }, duration + 400);
            }
        }

        function spawnStars(x, y, count = 12) {
            const colors = ['#eab308', '#c084fc', '#67e8f9', '#fff'];
            const container = document.body;

            for (let i = 0; i < count; i++) {
                const star = document.createElement('i');
                star.className = `fa-solid fa-star pointer-events-none fixed z-[9999]`;
                star.style.left = `${x}px`;
                star.style.top = `${y}px`;
                star.style.color = colors[Math.floor(Math.random() * colors.length)];
                star.style.fontSize = `${Math.random() * 14 + 10}px`;
                star.style.opacity = '1';
                star.style.transition = 'transform 0.7s cubic-bezier(0.23, 1.0, 0.32, 1), opacity 0.7s ease-out';
                star.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';

                container.appendChild(star);

                // Random burst direction + slight upward bias
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * 70 + 35;
                const tx = Math.cos(angle) * dist;
                const ty = Math.sin(angle) * dist - (Math.random() * 40 + 20); // upward
                const rot = (Math.random() - 0.5) * 180;

                // Trigger the animation on next frame
                requestAnimationFrame(() => {
                    star.style.transform = `translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(${Math.random() * 0.4 + 0.3}) rotate(${rot}deg)`;
                    star.style.opacity = '0';
                });

                // Remove after animation
                setTimeout(() => {
                    star.remove();
                }, 800);
            }
        }

        function filterInitial() {
            // Render all mods on start
            renderMods();
            
            // Mark the all button active
            const allBtn = document.querySelector('[data-filter="all"]');
            if (allBtn) allBtn.classList.add('active');
        }

        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // Keyboard support
        function setupKeyboard() {
            document.addEventListener('keydown', function(e) {
                if (e.key === "/" && document.activeElement.tagName === "BODY") {
                    scrollToSection('mods', e);
                }
                if (e.key.toLowerCase() === "escape") {
                    const modModal = document.getElementById('mod-modal');
                    const reqModal = document.getElementById('request-modal');
                    
                    if (!modModal.classList.contains('hidden')) {
                        modModal.classList.add('hidden');
                        modModal.classList.remove('flex');
                    } else if (!reqModal.classList.contains('hidden')) {
                        reqModal.classList.add('hidden');
                        reqModal.classList.remove('flex');
                    }
                }
            });
            
            // Easter egg: Press "5" on hero to trigger stars
            const hero = document.querySelector('header');
            if (hero) {
                hero.addEventListener('click', function handler(ev) {
                    if (ev.target.tagName === "HEADER" || ev.target.closest('header')) {
                        // Check if click was near the title
                        launchConfetti(18);
                        hero.removeEventListener('click', handler);
                    }
                });
            }
        }

        // === GTA V Menu UI Sound ===
        const GTA_MENU_SOUND_URL = 'sounds/gta-menu-hover.mp3';
        const GTA_MENU_HOVER_SELECTORS = [
            'a[href]',
            'button',
            '[role="button"]',
            'input:not([type="hidden"])',
            'textarea',
            'select',
            'label',
            '.nav-link',
            '.interactive-btn',
            '.platform-btn',
            '.mod-card',
            '.mod-filter-btn',
            '.support-ticket-notice',
            '.content-video-ctrl-btn',
            '.content-cinema-frame',
            '.theme-toggle-btn',
            '.discord-panel-refresh-btn',
            '.discord-widget-join',
            '.logo-video-wrap',
            '[onclick]',
            '[tabindex]:not([tabindex="-1"])'
        ].join(', ');

        let gtaMenuAudioPrimed = false;
        let gtaMenuLastHoverTarget = null;
        let gtaMenuLastTouchTarget = null;
        let gtaMenuLastPlayAt = 0;
        const GTA_MENU_SOUND_VOLUME = 0.62;
        const GTA_MENU_PLAY_DEBOUNCE_MS = 90;

        function getGtaMenuAudioElement() {
            return document.getElementById('gta-menu-hover-audio');
        }

        function ensureGtaMenuAudioSrc(audio) {
            if (!audio) return null;
            if (!audio.getAttribute('src')) {
                audio.setAttribute('src', GTA_MENU_SOUND_URL);
            }
            if (!audio.src) {
                audio.src = GTA_MENU_SOUND_URL;
            }
            return audio;
        }

        function primeGtaMenuAudioSync() {
            if (gtaMenuAudioPrimed) return true;

            const audio = ensureGtaMenuAudioSrc(getGtaMenuAudioElement());
            if (!audio) return false;

            try {
                audio.volume = 0.001;
                audio.currentTime = 0;
                const playAttempt = audio.play();
                if (playAttempt && typeof playAttempt.then === 'function') {
                    playAttempt.then(() => {
                        audio.pause();
                        audio.currentTime = 0;
                        audio.volume = GTA_MENU_SOUND_VOLUME;
                        gtaMenuAudioPrimed = true;
                    }).catch(() => {});
                } else {
                    gtaMenuAudioPrimed = true;
                }
                return true;
            } catch (error) {
                return false;
            }
        }

        function playGtaMenuSoundSync() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

            const now = Date.now();
            if (now - gtaMenuLastPlayAt < GTA_MENU_PLAY_DEBOUNCE_MS) return false;
            gtaMenuLastPlayAt = now;

            const audio = ensureGtaMenuAudioSrc(getGtaMenuAudioElement());
            if (!audio) return false;

            try {
                audio.volume = GTA_MENU_SOUND_VOLUME;

                if (!audio.paused && audio.currentTime > 0) {
                    audio.pause();
                }

                audio.currentTime = 0;
                const playAttempt = audio.play();
                if (playAttempt && typeof playAttempt.then === 'function') {
                    playAttempt.then(() => {
                        gtaMenuAudioPrimed = true;
                    }).catch(() => {});
                } else {
                    gtaMenuAudioPrimed = true;
                }
                return true;
            } catch (error) {
                return false;
            }
        }

        function triggerGtaMenuSoundFromTarget(target) {
            if (!target) return;
            primeGtaMenuAudioSync();
            playGtaMenuSoundSync();
        }

        function supportsDesktopHoverUi() {
            return window.matchMedia('(hover: hover)').matches
                && !window.matchMedia('(pointer: coarse)').matches;
        }

        function initGtaMenuHoverSounds() {
            ensureGtaMenuAudioSrc(getGtaMenuAudioElement());

            const unlockAudio = () => {
                primeGtaMenuAudioSync();
            };

            ['pointerdown', 'mousedown', 'keydown', 'touchstart'].forEach((eventName) => {
                document.addEventListener(eventName, unlockAudio, { capture: true });
            });

            document.addEventListener('pointerdown', (event) => {
                const target = event.target.closest(GTA_MENU_HOVER_SELECTORS);
                if (!target) return;

                if (event.pointerType === 'touch') {
                    if (target === gtaMenuLastTouchTarget) return;
                    gtaMenuLastTouchTarget = target;
                }

                triggerGtaMenuSoundFromTarget(target);
            }, { capture: true, passive: true });

            document.addEventListener('pointerup', () => {
                gtaMenuLastTouchTarget = null;
            }, { capture: true, passive: true });

            if (supportsDesktopHoverUi()) {
                const handleGtaMenuHover = (event) => {
                    const target = event.target.closest(GTA_MENU_HOVER_SELECTORS);
                    if (!target || target === gtaMenuLastHoverTarget) return;

                    const from = event.relatedTarget;
                    if (from && target.contains(from)) return;

                    gtaMenuLastHoverTarget = target;

                    if (!gtaMenuAudioPrimed) return;

                    playGtaMenuSoundSync();
                };

                document.addEventListener('mouseover', handleGtaMenuHover);

                document.addEventListener('mouseout', (event) => {
                    const target = event.target.closest(GTA_MENU_HOVER_SELECTORS);
                    if (!target) return;

                    const to = event.relatedTarget;
                    if (to && target.contains(to)) return;

                    if (gtaMenuLastHoverTarget === target) {
                        gtaMenuLastHoverTarget = null;
                    }
                });
            }
        }
        // === Mouse Interactive Features ===
        function addMouseInteractions() {
            const glow = document.getElementById('mouse-glow');
            const hero = document.querySelector('header');
            const enablePointerFx = !isTouchLikeDevice() && !isLowPerfDevice();

            // 1. Global mouse glow follower (subtle light source)
            if (glow && enablePointerFx) {
                let mouseX = window.innerWidth / 2;
                let mouseY = window.innerHeight / 2;
                let currentX = mouseX;
                let currentY = mouseY;

                document.addEventListener('mousemove', (e) => {
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                    glow.style.opacity = '0.65';
                });

                // Hide glow when mouse leaves window
                document.addEventListener('mouseleave', () => {
                    glow.style.opacity = '0.2';
                });

                function updateGlow() {
                    currentX += (mouseX - currentX) * 0.12;
                    currentY += (mouseY - currentY) * 0.12;
                    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
                    requestAnimationFrame(updateGlow);
                }
                updateGlow();
            } else if (glow) {
                glow.style.display = 'none';
            }

            // 2. 3D Tilt effect on interactive cards
            if (!enablePointerFx) {
                initContentInteractions();
                return;
            }

            const tiltSelectors = [
                '.mod-card',
                '#support .glass',
                '.support-ticket-notice'
            ];

            tiltSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(card => {
                    card.classList.add('tilt');

                    card.addEventListener('mousemove', (e) => {
                        const rect = card.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) - 0.5;
                        const y = ((e.clientY - rect.top) / rect.height) - 0.5;

                        const rotateX = y * -12;
                        const rotateY = x * 16;

                        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                        card.style.boxShadow = '0 25px 50px -12px rgb(0 0 0 / 0.4)';
                    });

                    card.addEventListener('mouseleave', () => {
                        card.style.transform = '';
                        card.style.boxShadow = '';
                    });
                });
            });

            document.querySelectorAll('.support-ticket-notice').forEach((notice) => {
                notice.addEventListener('mouseenter', () => notice.classList.add('is-active'));
                notice.addEventListener('mouseleave', () => notice.classList.remove('is-active'));
                notice.addEventListener('mousemove', (e) => {
                    const rect = notice.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    notice.style.setProperty('--notice-x', `${x}%`);
                    notice.style.setProperty('--notice-y', `${y}%`);
                });
            });

            // 3. Mouse parallax on hero floating stars
            if (hero) {
                const stars = hero.querySelectorAll('.star');
                hero.addEventListener('mousemove', (e) => {
                    const rect = hero.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;

                    stars.forEach((star, index) => {
                        const intensity = (index % 3) * 0.6 + 1.2;
                        const moveX = x * intensity * 18;
                        const moveY = y * intensity * 14;
                        star.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    });
                });

                hero.addEventListener('mouseleave', () => {
                    stars.forEach(star => {
                        star.style.transform = '';
                    });
                });
            }

            // 4. Extra: Make the hero title slightly magnetic to mouse
            const heroTitle = document.querySelector('h1.fsc-brand');
            if (heroTitle && hero) {
                hero.addEventListener('mousemove', (e) => {
                    const rect = hero.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;

                    const offsetX = x * 6;
                    const offsetY = y * 4;
                    heroTitle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                });

                hero.addEventListener('mouseleave', () => {
                    heroTitle.style.transform = '';
                });
            }

            // 5. Make buttons highly interactive (tilt on mouse + click bursts)
            const interactiveButtons = document.querySelectorAll('.interactive-btn, .platform-btn');
            interactiveButtons.forEach(btn => {
                btn.classList.add('tilt');

                // 3D tilt following mouse
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
                    const y = ((e.clientY - rect.top) / rect.height) - 0.5;

                    const rotateX = y * -15;
                    const rotateY = x * 20;

                    btn.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                });

                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = '';
                });

                // Click: small star burst at button center + press effect
                btn.addEventListener('click', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;

                    if (typeof spawnStars === 'function') {
                        spawnStars(cx, cy, 6);  // small interactive burst
                    }

                    // Quick press animation
                    btn.style.transform = 'scale(0.92)';
                    setTimeout(() => {
                        if (btn.style.transform.includes('scale(0.92)')) {
                            btn.style.transform = '';
                        }
                    }, 150);
                });
            });

            initContentInteractions();
        }

        function initContentInteractions() {
            const section = document.getElementById('content');
            if (!section) return;

            const prefersReducedMotion = shouldReduceMotionEffects() || isTouchLikeDevice();
            const spotlight = section.querySelector('.content-spotlight');
            const header = section.querySelector('.content-header-parallax');
            const stages = section.querySelectorAll('.content-player-stage');
            const frames = section.querySelectorAll('.content-cinema-frame');
            const auroras = section.querySelectorAll('.content-aurora');

            if (!prefersReducedMotion) {
                section.addEventListener('mousemove', (e) => {
                    const rect = section.getBoundingClientRect();
                    const localX = e.clientX - rect.left;
                    const localY = e.clientY - rect.top;

                    if (spotlight) {
                        spotlight.style.setProperty('--content-mx', `${localX}px`);
                        spotlight.style.setProperty('--content-my', `${localY}px`);
                        spotlight.style.opacity = '1';
                    }

                    if (header) {
                        const x = (e.clientX - rect.left) / rect.width - 0.5;
                        const y = (e.clientY - rect.top) / rect.height - 0.5;
                        header.style.transform = `translate(${x * 12}px, ${y * 8}px)`;
                    }

                    let closestFrame = null;
                    let closestDistance = Infinity;

                    frames.forEach((frame) => {
                        const frameRect = frame.getBoundingClientRect();
                        const centerX = frameRect.left + frameRect.width / 2;
                        const centerY = frameRect.top + frameRect.height / 2;
                        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

                        if (distance < closestDistance) {
                            closestDistance = distance;
                            closestFrame = frame;
                        }
                    });

                    stages.forEach((stage) => stage.classList.remove('is-active'));

                    frames.forEach((frame) => {
                        if (frame !== closestFrame) {
                            frame.style.transform = '';
                            return;
                        }

                        const activeStage = frame.closest('.content-player-stage');
                        activeStage?.classList.add('is-active');

                        const frameRect = frame.getBoundingClientRect();
                        const x = ((e.clientX - frameRect.left) / frameRect.width) - 0.5;
                        const y = ((e.clientY - frameRect.top) / frameRect.height) - 0.5;
                        const rotateX = y * -8;
                        const rotateY = x * 12;

                        frame.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
                    });
                });

                section.addEventListener('mouseleave', () => {
                    if (spotlight) spotlight.style.opacity = '0';
                    if (header) header.style.transform = '';
                    frames.forEach((frame) => { frame.style.transform = ''; });
                    stages.forEach((stage) => stage.classList.remove('is-active'));
                });

                const syncAuroraParallax = () => {
                    const contentTop = section.getBoundingClientRect().top;
                    const offset = Math.max(-40, Math.min(40, contentTop * 0.04));
                    auroras.forEach((aurora, index) => {
                        const direction = index % 2 === 0 ? 1 : -1;
                        aurora.style.setProperty('--aurora-shift-y', `${offset * direction}px`);
                    });
                };

                window.addEventListener('scroll', () => {
                    if (window._contentAuroraRaf) return;
                    window._contentAuroraRaf = requestAnimationFrame(() => {
                        window._contentAuroraRaf = null;
                        syncAuroraParallax();
                    });
                }, { passive: true });

                syncAuroraParallax();
            }
        }

        function initSpaceParticles() {
            const canvas = document.getElementById('space-particles');
            if (!canvas || shouldReduceMotionEffects()) return;

            const ctx = canvas.getContext('2d');
            const header = canvas.parentElement;
            const perf = sitePerfTier();
            const densityDivisor = perf === 'high' ? 900 : (perf === 'medium' ? 2200 : 4200);
            const glowStarCount = perf === 'high' ? 8 : (perf === 'medium' ? 4 : 2);
            let animationId = null;
            let isVisible = true;

            let width = 0;
            let height = 0;
            let stars = [];
            let time = 0;

            function resize() {
                width = header.offsetWidth || window.innerWidth;
                height = header.offsetHeight || window.innerHeight;
                canvas.width = width;
                canvas.height = height;
            }

            window.addEventListener('resize', resize);
            resize();

            // Create stars
            const numStars = Math.max(18, Math.floor((width * height) / densityDivisor));
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 2.2 + 0.5,
                    vx: (Math.random() - 0.5) * 0.8,  // stronger horizontal drift
                    vy: Math.random() * 1.0 + 0.3,    // stronger vertical movement for visible space travel
                    alpha: Math.random() * 0.8 + 0.2,
                    twinkleSpeed: Math.random() * 0.04 + 0.015,
                    twinklePhase: Math.random() * Math.PI * 2
                });
            }

            function getParticleColors() {
                const styles = getComputedStyle(document.documentElement);
                return {
                    trail: styles.getPropertyValue('--theme-particle-trail').trim() || 'rgba(0, 0, 0, 0.3)',
                    core: styles.getPropertyValue('--theme-particle').trim() || '#ffffff',
                    glow: styles.getPropertyValue('--theme-particle-glow').trim() || '#e0f7ff'
                };
            }

            function draw() {
                if (!isVisible || document.hidden) {
                    animationId = requestAnimationFrame(draw);
                    return;
                }

                const colors = getParticleColors();
                ctx.fillStyle = colors.trail;
                ctx.fillRect(0, 0, width, height);

                ctx.fillStyle = colors.core;

                for (let i = 0; i < stars.length; i++) {
                    const s = stars[i];

                    // Twinkle
                    const twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase) * 0.5 + 0.5;
                    const currentAlpha = s.alpha * (0.3 + twinkle * 0.7);

                    ctx.globalAlpha = currentAlpha;
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                    ctx.fill();

                    // Move stars - continuous drift for space movement
                    s.x += s.vx;
                    s.y += s.vy;

                    // Wrap around screen for infinite space effect
                    if (s.y > height) s.y = 0;
                    if (s.y < 0) s.y = height;
                    if (s.x > width) s.x = 0;
                    if (s.x < 0) s.x = width;
                }

                ctx.globalAlpha = 1;

                // Add a few brighter "near" stars with glow
                for (let i = 0; i < Math.min(glowStarCount, stars.length); i++) {
                    const s = stars[i];
                    ctx.fillStyle = colors.glow;
                    ctx.globalAlpha = 0.6;
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.size * 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.globalAlpha = 1;

                time += perf === 'low' ? 0.5 : 1;
                animationId = requestAnimationFrame(draw);
            }

            document.addEventListener('visibilitychange', () => {
                isVisible = !document.hidden;
            });

            if ('IntersectionObserver' in window && header) {
                const observer = new IntersectionObserver((entries) => {
                    isVisible = entries.some((entry) => entry.isIntersecting) && !document.hidden;
                }, { threshold: 0.05 });
                observer.observe(header);
            }

            // Start animation
            draw();

            // Background stars are now non-interactive (pure animation)
            // Mouse effects moved to buttons
        }

        // Initialize everything
        function initializeSite() {
            optimizeMediaLoading();
            scrollToHome(null, true);
            animateStats();
            filterInitial();
            setupKeyboard();
            initContentVideo();
            initDiscordWidgetWhenVisible();

            const logoVideo = document.getElementById('nav-logo-video');
            if (logoVideo) {
                if (isLowPerfDevice()) {
                    logoVideo.preload = 'none';
                }
                if (getTheme() === 'dark') {
                    const playLogo = () => {
                        if (getTheme() === 'dark') logoVideo.play().catch(() => {});
                    };
                    if (!isLowPerfDevice()) playLogo();
                    document.addEventListener('click', playLogo, { once: true });
                    document.addEventListener('touchstart', playLogo, { once: true });
                } else {
                    syncNavLogo(getTheme());
                }
            }

            runWhenIdle(() => {
                initGtaMenuHoverSounds();
                addMouseInteractions();
                initSpaceParticles();
            }, 1200);

            if (!shouldReduceHeavyEffects()) {
                // Click-to-spawn stars (interactive mouse feature)
                let lastSpawn = 0;
                document.addEventListener('click', (e) => {
                    if (e.target.closest('button, a, input, textarea, select, .modal, [onclick]')) {
                        return;
                    }
                    const now = Date.now();
                    if (now - lastSpawn < 120) return;
                    lastSpawn = now;

                    spawnStars(e.clientX, e.clientY, 8 + Math.floor(Math.random() * 6));
                });

                const heroTitle = document.querySelector('h1.fsc-brand');
                if (heroTitle) {
                    heroTitle.addEventListener('click', (e) => {
                        e.stopPropagation();
                        spawnStars(e.clientX, e.clientY, 18);
                        if (Math.random() > 0.6) launchConfetti(15);
                    });
                }
            }
            
            // Demo: Increment download stat every 45s
            setInterval(() => {
                const stat = document.getElementById('download-stat');
                if (stat && !document.hidden) {
                    let val = parseFloat(stat.textContent);
                    val = val + 0.03;
                    stat.textContent = val.toFixed(1) + 'k';
                }
            }, 45000);
        }

        window.onload = initializeSite;
        
        // Expose some functions globally for debugging / fun
        window.fiveStarr = {
            launchConfetti,
            joinDiscord,
            filterMods,
            toggleTheme,
            applyTheme
        };

// --- CSP-safe event delegation (no inline handlers) ---
(function bindCspSafeHandlers() {
    const FALLBACK_AVATAR = 'https://temp2.modland.net/avatars/jQKGzvtegETXyfD0Wg0frUPJofJZZL67GNRYc0jN.jpg';
    const PICSUM_FALLBACK = 'https://picsum.photos/id/1015/600/400';

    document.addEventListener('error', function (e) {
        const t = e.target;
        if (!(t instanceof HTMLImageElement)) return;
        if (t.dataset.fallback && t.src !== t.dataset.fallback) {
            t.src = t.dataset.fallback;
            if (t.classList.contains('mod-image-fallback') || t.classList.contains('mod-image')) {
                t.style.filter = 'grayscale(0.6)';
            }
            return;
        }
        if (t.classList.contains('mod-image') && !t.dataset.failedOnce) {
            t.dataset.failedOnce = '1';
            t.src = PICSUM_FALLBACK;
            t.style.filter = 'grayscale(0.6)';
        }
    }, true);

    // Creator avatar fallback
    const creatorImg = document.querySelector('img[src*="storage.ko-fi.com"]');
    if (creatorImg && !creatorImg.dataset.fallback) {
        creatorImg.dataset.fallback = FALLBACK_AVATAR;
    }

    document.addEventListener('click', function (e) {
        const el = e.target instanceof Element ? e.target.closest('[data-action]') : null;
        if (!el) {
            // Logo home
            if (e.target instanceof Element && e.target.closest('#logo-home, [data-action-home]')) {
                if (typeof scrollToHome === 'function') scrollToHome(e);
                return;
            }
            // Mod card view buttons without data-action already handled
            const modView = e.target instanceof Element ? e.target.closest('[data-mod-id]') : null;
            if (modView && modView.dataset.action === 'view-mod') {
                e.stopImmediatePropagation();
                viewMod(Number(modView.dataset.modId));
            }
            // Modal backdrop
            if (e.target && e.target.id === 'mod-modal' && typeof closeModModal === 'function') {
                closeModModal(e);
            }
            if (e.target && e.target.id === 'request-modal' && typeof closeRequestModal === 'function') {
                closeRequestModal(e);
            }
            return;
        }

        const action = el.dataset.action;
        switch (action) {
            case 'scroll-home':
                if (typeof scrollToHome === 'function') scrollToHome(e);
                break;
            case 'scroll-section': {
                const section = el.dataset.section;
                if (section && typeof scrollToSection === 'function') scrollToSection(section, e);
                if (el.dataset.closeMobile === '1' && typeof toggleMobileMenu === 'function') toggleMobileMenu();
                break;
            }
            case 'toggle-theme':
                if (typeof toggleTheme === 'function') toggleTheme();
                break;
            case 'toggle-mobile':
                if (typeof toggleMobileMenu === 'function') toggleMobileMenu();
                break;
            case 'join-discord':
                if (typeof joinDiscord === 'function') joinDiscord();
                if (el.dataset.closeMobile === '1' && typeof toggleMobileMenu === 'function') toggleMobileMenu();
                break;
            case 'filter-mods':
                if (typeof filterMods === 'function') filterMods(el.dataset.filter || 'all');
                break;
            case 'copy-discord':
                if (typeof copyDiscordLink === 'function') copyDiscordLink();
                break;
            case 'refresh-discord':
                if (typeof refreshDiscordPanel === 'function') refreshDiscordPanel();
                break;
            case 'open-patreon':
                if (typeof openPatreon === 'function') openPatreon();
                break;
            case 'open-kofi':
                if (typeof openKofi === 'function') openKofi();
                break;
            case 'open-modland':
                if (typeof openModland === 'function') openModland();
                break;
            case 'open-request':
                if (typeof openRequestModal === 'function') openRequestModal();
                break;
            case 'simulate-commission':
                if (typeof simulateCommission === 'function') simulateCommission();
                break;
            case 'close-mod-modal':
                if (typeof closeModModal === 'function') {
                    const force = !(e.target && e.target.id === 'mod-modal');
                    closeModModal(e, force);
                }
                break;
            case 'close-request-modal':
                if (typeof closeRequestModal === 'function') {
                    const force = !(e.target && e.target.id === 'request-modal');
                    closeRequestModal(e, force);
                }
                break;
            case 'stop-modal':
                e.stopImmediatePropagation();
                break;
            case 'download-mod':
                if (typeof downloadMod === 'function') downloadMod();
                break;
            case 'favorite-mod':
                if (typeof favoriteMod === 'function') favoriteMod();
                break;
            case 'view-mod':
                e.stopImmediatePropagation();
                if (typeof viewMod === 'function') viewMod(Number(el.dataset.modId));
                break;
            default:
                break;
        }
    });

    document.addEventListener('keydown', function (e) {
        const el = e.target instanceof Element ? e.target.closest('[data-action]') : null;
        if (!el) return;
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const action = el.dataset.action;
        if (action === 'scroll-home') {
            e.preventDefault();
            if (typeof scrollToHome === 'function') scrollToHome(e);
        } else if (action === 'join-discord') {
            e.preventDefault();
            if (typeof joinDiscord === 'function') joinDiscord();
        }
    });

    const requestForm = document.getElementById('request-form');
    if (requestForm) {
        requestForm.addEventListener('submit', function (e) {
            if (typeof submitRequest === 'function') submitRequest(e);
        });
    }
})();
