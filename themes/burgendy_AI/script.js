document.documentElement.classList.add('js');
document.body.classList.add('is-loading');

document.body.classList.add('portal-entered');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const wrapWords = (node) => {
	const fragment = document.createDocumentFragment();
	Array.from(node.childNodes).forEach((child) => {
		if (child.nodeType === Node.TEXT_NODE) {
			child.textContent.split(/(\s+)/).forEach((part) => {
				if (!part) {
					return;
				}
				if (/^\s+$/.test(part)) {
					fragment.appendChild(document.createTextNode(part));
				} else {
					const mask = document.createElement('span');
					mask.className = 'w-mask';
					const word = document.createElement('span');
					word.className = 'w-word';
					word.textContent = part;
					mask.appendChild(word);
					fragment.appendChild(mask);
				}
			});
		} else if (child.nodeType === Node.ELEMENT_NODE && child.children.length === 0) {
			wrapWords(child);
			fragment.appendChild(child);
		} else {
			fragment.appendChild(child);
		}
	});
	node.replaceChildren(fragment);
};

document.addEventListener('DOMContentLoaded', () => {
	const root = document.documentElement;
	const loader = document.getElementById('siteLoader');
	const loadFill = document.getElementById('loadFill');
	const loadPct = document.getElementById('loadPct');
	const toTop = document.getElementById('toTop');
	let pageReadyFired = false;

	const lockEntranceForRestoredScroll = () => {
		if (window.scrollY > 40) {
			document.body.classList.add('is-restored-scroll');
		}
	};
	lockEntranceForRestoredScroll();
	window.addEventListener('load', lockEntranceForRestoredScroll, { once: true });

	const firePageReady = () => {
		if (pageReadyFired) {
			return;
		}
		pageReadyFired = true;
		document.body.classList.add('page-ready');
		document.body.classList.add('is-loaded');
	};

	const finishLoader = () => {
		document.body.classList.remove('is-loading');
		if (loader) {
			loader.classList.add('is-done');
			window.setTimeout(() => loader.remove(), 700);
		}
		firePageReady();
	};

	let loaderSeen = false;
	try {
		loaderSeen = window.sessionStorage.getItem('burgendySeen') === '1';
	} catch (error) {
		loaderSeen = true;
	}

	if (!loader || reduceMotion || loaderSeen) {
		if (loader) {
			loader.remove();
		}
		document.body.classList.remove('is-loading');
		firePageReady();
	} else {
		let loaderDone = false;
		let progress = 0;
		const tick = window.setInterval(() => {
			progress = Math.min(progress + 6 + Math.random() * 12, 96);
			if (loadFill) {
				loadFill.style.width = `${progress}%`;
			}
			if (loadPct) {
				loadPct.textContent = `${String(Math.floor(progress)).padStart(2, '0')}%`;
			}
			if (progress >= 96) {
				window.clearInterval(tick);
			}
		}, 160);
		const done = () => {
			if (loaderDone) {
				return;
			}
			loaderDone = true;
			window.clearInterval(tick);
			if (loadFill) {
				loadFill.style.width = '100%';
			}
			if (loadPct) {
				loadPct.textContent = '100%';
			}
			try {
				window.sessionStorage.setItem('burgendySeen', '1');
			} catch (error) {
				/* private mode: run the loader on every visit */
			}
			window.setTimeout(finishLoader, 280);
		};
		if (document.readyState === 'complete') {
			window.setTimeout(done, 750);
		} else {
			window.addEventListener('load', () => window.setTimeout(done, 500));
			window.setTimeout(done, 3500);
		}
	}

	const heroNoteCached = document.querySelector('.hero__note');
	const updateOnScroll = () => {
		const scrollingElement = document.scrollingElement || root;
		const scrollableHeight = scrollingElement.scrollHeight - scrollingElement.clientHeight;
		const scrollTop = scrollingElement.scrollTop;
		const progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
		root.style.setProperty('--scroll-progress', progress.toFixed(4));

		const mix = 0.5 - 0.5 * Math.cos(Math.min(Math.max(progress, 0), 1) * Math.PI);
		const red = Math.round(100 + (201 - 100) * mix);
		const green = Math.round(31 + (152 - 31) * mix);
		const blue = Math.round(44 + (62 - 44) * mix);
		document.body.style.setProperty('--tint', `rgba(${red},${green},${blue},.10)`);

		if (toTop) {
			toTop.classList.toggle('is-visible', scrollTop > window.innerHeight * 0.6);
		}

		if (heroNoteCached && !heroNoteCached.dataset.parallaxOff && scrollTop < window.innerHeight) {
			heroNoteCached.style.transform = `translate3d(0,${Math.min(scrollTop * 0.08, 60).toFixed(1)}px,0)`;
		}
	};

	let scrollQueued = false;
	window.addEventListener('scroll', () => {
		if (scrollQueued) {
			return;
		}
		scrollQueued = true;
		requestAnimationFrame(() => {
			scrollQueued = false;
			updateOnScroll();
		});
	}, { passive: true });
	updateOnScroll();

	if (toTop) {
		toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
	}

	document.querySelectorAll('.site-nav a, .site-logo[href], .site-footer a, a.text-link, a.button').forEach((link) => {
		link.addEventListener('click', (event) => {
			if (!link.hasAttribute('href')) {
				return;
			}
			const destination = new URL(link.getAttribute('href'), window.location.href);

			if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || destination.origin !== window.location.origin || destination.hash) {
				return;
			}

			event.preventDefault();
			document.body.classList.add('is-leaving');
			window.setTimeout(() => {
				window.location.href = destination.href;
			}, 180);
		});
	});

	const headline = document.querySelector('.hero h1:not([data-about-typewriter]), .page-hero h1:not([data-about-typewriter])');
	if (headline && !headline.classList.contains('reveal-headline')) {
		wrapWords(headline);
		headline.classList.add('reveal-headline');
		headline.querySelectorAll('.w-word').forEach((word, index) => {
			word.style.setProperty('--w', `${140 + index * 55}ms`);
		});
	}

	const fadeTargets = document.querySelectorAll('.project-row, .project-card, .post-preview, .fact-list div, .skills-list span, .skills-list button, .contact-details div, .stat');
	const wipeTargets = Array.from(document.querySelectorAll('.page-hero .eyebrow, .section .eyebrow')).filter((el) => !el.closest('.project-card'));
	const imageCovers = document.querySelectorAll('.project-row img, .project-card img, .content-image');

	if ('IntersectionObserver' in window) {
		const revealObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			});
		}, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

		const staggerReveal = (targets, flavor) => {
			Array.from(targets).forEach((target, index) => {
				target.classList.add(flavor);
				target.style.setProperty('--reveal-delay', `${Math.min(index * 45, 180)}ms`);
				revealObserver.observe(target);
			});
		};

		staggerReveal(fadeTargets, 'reveal-on-scroll');
		staggerReveal(wipeTargets, 'reveal-wipe');
		imageCovers.forEach((image) => image.classList.add('img-wipe'));
		document.querySelectorAll('.project-card img, .project-row img, .content-image').forEach((image) => {
			const revealImage = () => image.classList.add('is-loaded');
			if (image.complete && image.naturalWidth > 0) {
				revealImage();
			} else {
				image.addEventListener('load', revealImage, { once: true });
				image.addEventListener('error', revealImage, { once: true });
			}
		});

		if (!reduceMotion) {
			const countObserver = new IntersectionObserver((entries, observer) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}
					observer.unobserve(entry.target);
					const el = entry.target;
					const target = parseInt(el.dataset.count, 10) || 0;
					el.textContent = '00';
					const duration = 1200;
					const start = performance.now();
					const step = (now) => {
						const amount = Math.min(1, (now - start) / duration);
						const eased = 1 - Math.pow(1 - amount, 3);
						el.textContent = String(Math.round(target * eased)).padStart(2, '0');
						if (amount < 1) {
							requestAnimationFrame(step);
						}
					};
					requestAnimationFrame(step);
				});
			}, { threshold: 0.4 });
			document.querySelectorAll('.stat-num[data-count]').forEach((el) => countObserver.observe(el));
		}
	} else {
		fadeTargets.forEach((target) => target.classList.add('is-visible'));
		wipeTargets.forEach((target) => target.classList.add('is-visible'));
	}

	document.querySelectorAll('.tag-list').forEach((list) => {
		list.querySelectorAll('span').forEach((tag, index) => {
			tag.style.setProperty('--tag-i', `${index * 45}ms`);
		});
	});

	if (heroNoteCached && !reduceMotion) {
		let heroAnimEnded = false;
		heroNoteCached.addEventListener('animationend', () => {
			heroAnimEnded = true;
			heroNoteCached.style.animation = 'none';
		}, { once: true });
		window.setTimeout(() => {
			if (!heroAnimEnded) {
				heroNoteCached.dataset.parallaxOff = '1';
			}
		}, 4000);
	} else if (heroNoteCached) {
		heroNoteCached.dataset.parallaxOff = '1';
	}

	if (finePointer && !reduceMotion) {
		const cursorDot = document.getElementById('cursorDot');
		const cursorRing = document.getElementById('cursorRing');
		let dotX = window.innerWidth / 2;
		let dotY = window.innerHeight / 2;
		let ringX = dotX;
		let ringY = dotY;
		let mouseX = dotX;
		let mouseY = dotY;
		let cursorPressed = false;
		let dotScale = 1;

		document.addEventListener('mousemove', (event) => {
			mouseX = event.clientX;
			mouseY = event.clientY;
		});
		document.addEventListener('mousedown', () => {
			cursorPressed = true;
		});
		document.addEventListener('mouseup', () => {
			cursorPressed = false;
		});

		const updateCursor = () => {
			requestAnimationFrame(updateCursor);
			if (document.hidden) {
				return;
			}
			dotX += (mouseX - dotX) * 0.35;
			dotY += (mouseY - dotY) * 0.35;
			ringX += (mouseX - ringX) * 0.12;
			ringY += (mouseY - ringY) * 0.12;
			dotScale += ((cursorPressed ? 0.65 : 1) - dotScale) * 0.3;
			if (cursorDot) {
				cursorDot.style.transform = `translate(${dotX.toFixed(1)}px,${dotY.toFixed(1)}px) translate(-50%,-50%) scale(${dotScale.toFixed(3)})`;
			}
			if (cursorRing) {
				cursorRing.style.transform = `translate(${ringX.toFixed(1)}px,${ringY.toFixed(1)}px) translate(-50%,-50%)`;
			}
		};
		requestAnimationFrame(updateCursor);

		document.querySelectorAll('a, button, [data-magnetic], [data-tilt], .project-card, .project-row').forEach((el) => {
			el.addEventListener('mouseenter', () => {
				if (cursorRing) {
					cursorRing.classList.add('is-hover');
				}
			});
			el.addEventListener('mouseleave', () => {
				if (cursorRing) {
					cursorRing.classList.remove('is-hover');
				}
			});
		});

		document.querySelectorAll('[data-magnetic]').forEach((el) => {
			el.addEventListener('mousemove', (event) => {
				const rect = el.getBoundingClientRect();
				const x = event.clientX - rect.left - rect.width / 2;
				const y = event.clientY - rect.top - rect.height / 2;
				el.style.translate = `${(x * 0.3).toFixed(1)}px ${(y * 0.3).toFixed(1)}px`;
			});
			el.addEventListener('mouseleave', () => {
				el.style.translate = '';
			});
		});

		document.querySelectorAll('[data-tilt]').forEach((el) => {
			el.addEventListener('mouseenter', () => {
				el.style.transition = 'transform .18s ease-out';
			});
			el.addEventListener('mousemove', (event) => {
				const rect = el.getBoundingClientRect();
				const px = (event.clientX - rect.left) / rect.width - 0.5;
				const py = (event.clientY - rect.top) / rect.height - 0.5;
				el.style.transform = `perspective(800px) rotateY(${(px * 6).toFixed(2)}deg) rotateX(${(-py * 6).toFixed(2)}deg) scale(1.02)`;
			});
			el.addEventListener('mouseleave', () => {
				el.style.transition = '';
				el.style.transform = '';
			});
		});
	}

	const dust = document.getElementById('dust-canvas');
	if (dust && !reduceMotion) {
		const context = dust.getContext('2d');
		const TAU = Math.PI * 2;
		const COLORS = [[201, 152, 62], [100, 31, 44], [232, 200, 122]];
		let width = 0;
		let height = 0;
		let running = true;
		let time = 0;
		let lastY = window.scrollY;
		let velocity = 0;
		let targetMX = 0;
		let targetMY = 0;
		let smoothMX = 0;
		let smoothMY = 0;
		const particles = [];

		const resize = () => {
			width = dust.width = window.innerWidth;
			height = dust.height = window.innerHeight;
		};
		resize();
		window.addEventListener('resize', resize);

		const count = Math.max(30, Math.min(90, Math.floor(window.innerWidth * window.innerHeight / 22000)));
		for (let i = 0; i < count; i++) {
			particles.push({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				radius: 0.8 + Math.random() * 1.8,
				alpha: 0.10 + Math.random() * 0.25,
				phase: Math.random() * TAU,
				speed: 0.12 + Math.random() * 0.3,
				depth: 0.3 + Math.random() * 0.7,
				color: COLORS[Math.floor(Math.random() * COLORS.length)],
			});
		}

		document.addEventListener('mousemove', (event) => {
			targetMX = event.clientX / window.innerWidth - 0.5;
			targetMY = event.clientY / window.innerHeight - 0.5;
		});

		document.addEventListener('visibilitychange', () => {
			running = !document.hidden;
			if (running) {
				requestAnimationFrame(frame);
			}
		});

		const frame = () => {
			if (!running) {
				return;
			}
			requestAnimationFrame(frame);
			const scrollY = window.scrollY;
			velocity += (Math.abs(scrollY - lastY) - velocity) * 0.08;
			lastY = scrollY;
			smoothMX += (targetMX - smoothMX) * 0.04;
			smoothMY += (targetMY - smoothMY) * 0.04;
			time += 0.016;
			context.clearRect(0, 0, width, height);
			const boost = 1 + Math.min(velocity / 40, 1) * 2.2;
			particles.forEach((particle) => {
				particle.y -= particle.speed * boost;
				particle.x += Math.sin(time * 0.6 + particle.phase) * 0.15;
				if (particle.y < -4) {
					particle.y = height + 4;
					particle.x = Math.random() * width;
				}
				const twinkle = 0.6 + 0.4 * Math.sin(time * 1.4 + particle.phase);
				const x = particle.x + smoothMX * 40 * particle.depth;
				const y = particle.y + smoothMY * 40 * particle.depth;
				context.beginPath();
				context.arc(x, y, particle.radius, 0, TAU);
				context.fillStyle = `rgba(${particle.color[0]},${particle.color[1]},${particle.color[2]},${(particle.alpha * twinkle).toFixed(3)})`;
				context.fill();
			});
		};
		requestAnimationFrame(frame);
	}

	const aboutRoot = document.querySelector('.about-playground');
	if (aboutRoot && !reduceMotion) {
		const typewriter = aboutRoot.querySelector('[data-about-typewriter]');
		if (typewriter && !document.body.classList.contains('is-restored-scroll')) {
			const fullText = typewriter.textContent;
			typewriter.setAttribute('aria-label', fullText);
			typewriter.textContent = '';
			typewriter.classList.add('is-typing');
			let charIndex = 0;
			const typeNext = () => {
				charIndex += 1;
				typewriter.textContent = fullText.slice(0, charIndex);
				if (charIndex < fullText.length) {
					const ch = fullText[charIndex - 1];
					const pause = ch === '.' || ch === ',' ? 260 : 24 + Math.random() * 42;
					window.setTimeout(typeNext, pause);
				} else {
					window.setTimeout(() => typewriter.classList.remove('is-typing'), 2400);
				}
			};
			window.setTimeout(typeNext, 450);
		}

		aboutRoot.querySelectorAll('[data-orb]').forEach((orb) => {
			orb.addEventListener('click', () => {
				if (orb.dataset.busy === '1') {
					return;
				}
				orb.dataset.busy = '1';
				const x = (Math.random() * 120 - 60).toFixed(0);
				const y = (Math.random() * 80 - 40).toFixed(0);
				const r = (Math.random() * 28 - 14).toFixed(0);
				orb.style.transform = `translate(${x}px,${y}px) rotate(${r}deg) scale(1.12)`;
				window.setTimeout(() => {
					orb.style.transform = '';
				}, 180);
				window.setTimeout(() => {
					orb.dataset.busy = '';
				}, 620);
			});
		});

		const glow = document.getElementById('aboutGlow');
		if (glow && finePointer) {
			let gx = window.innerWidth / 2;
			let gy = 200;
			let tx = gx;
			let ty = gy;
			document.addEventListener('mousemove', (event) => {
				tx = event.clientX;
				ty = event.clientY;
				glow.classList.add('is-on');
			});
			document.addEventListener('mouseleave', () => glow.classList.remove('is-on'));
			const placeGlow = () => {
				requestAnimationFrame(placeGlow);
				if (document.hidden) {
					return;
				}
				gx += (tx - gx) * 0.08;
				gy += (ty - gy) * 0.08;
				glow.style.transform = `translate(${(gx - 260).toFixed(1)}px,${(gy - 260).toFixed(1)}px)`;
			};
			requestAnimationFrame(placeGlow);
		}
	}

	document.querySelectorAll('[data-tomato-game]').forEach((game) => {
		const field = game.querySelector('[data-tomato-field]');
		const basket = game.querySelector('[data-tomato-basket]');
		const scoreEl = game.querySelector('[data-tomato-score]');
		const timeEl = game.querySelector('[data-tomato-time]');
		const bestEl = game.querySelector('[data-tomato-best]');
		const startBtn = game.querySelector('[data-tomato-start]');
		const note = game.querySelector('[data-tomato-note]');
		if (!field || !basket || !startBtn) {
			return;
		}
		let best = 0;
		try {
			best = Number(window.localStorage.getItem('tomatoBest') || 0) || 0;
		} catch (error) {
			best = 0;
		}
		if (bestEl) {
			bestEl.textContent = String(best);
		}
		if (reduceMotion) {
			if (note) {
				note.textContent = 'Minigame uit (reduced motion) — het verhaal blijft volledig leesbaar.';
			}
			startBtn.disabled = true;
			return;
		}
		let running = false;
		let score = 0;
		let timeLeft = 30;
		let elapsed = 0;
		let basketX = 0.5;
		let items = [];
		let rafId = 0;
		let spawnTimer = 0;
		let countdownTimer = 0;
		let lastTick = 0;
		let level = 1;
		let combo = 0;
		let bestCombo = 0;
		let lives = 3;
		let hudExtra = null;
		let livesEl = null;
		let comboEl = null;
		let levelEl = null;
		basket.style.left = '0';
		const clamp01 = (value) => Math.min(Math.max(value, 0), 1);
		const placeBasket = () => {
			const max = Math.max(field.clientWidth - basket.offsetWidth, 1);
			basket.style.transform = `translate(${(basketX * max).toFixed(1)}px,0)`;
		};
		const setNote = (text, hide) => {
			if (!note) {
				return;
			}
			if (text) {
				note.textContent = text;
			}
			note.classList.toggle('is-hidden', Boolean(hide));
		};
		const clearItems = () => {
			items.forEach((item) => item.el.remove());
			items = [];
		};
		/* HUD uitbreiden via JS zodat het PHP-template ongewijzigd blijft. */
		const ensureHudExtra = () => {
			const hud = game.querySelector('.tomato-game__hud');
			if (!hud || hudExtra) {
				return;
			}
			hudExtra = document.createElement('span');
			hudExtra.className = 'tomato-game__hud-extra';
			hudExtra.innerHTML = 'Levens <strong data-tomato-lives>❤❤❤</strong> · Combo <strong data-tomato-combo>x0</strong> · Level <strong data-tomato-level>1</strong>';
			hud.appendChild(hudExtra);
			livesEl = hudExtra.querySelector('[data-tomato-lives]');
			comboEl = hudExtra.querySelector('[data-tomato-combo]');
			levelEl = hudExtra.querySelector('[data-tomato-level]');
		};
		ensureHudExtra();
		const renderHudExtra = () => {
			if (livesEl) {
				livesEl.textContent = '❤'.repeat(Math.max(lives, 0)) + '·'.repeat(Math.max(3 - lives, 0));
			}
			if (comboEl) {
				comboEl.textContent = 'x' + String(combo);
			}
			if (levelEl) {
				levelEl.textContent = String(level);
			}
		};
		const flashCombo = () => {
			if (!comboEl || combo < 3) {
				return;
			}
			comboEl.classList.remove('combo-flash');
			void comboEl.offsetWidth;
			comboEl.classList.add('combo-flash');
		};
		const levelForElapsed = (seconds) => Math.min(1 + Math.floor(seconds / 10), 3);
		const spawnIntervalFor = (seconds) => Math.max(650 - seconds * 10, 350);
		/* Rotte-tomaat regel (documentatie): ~18% van de spawns is rot (🤢, class .tomato--rotten).
		 * Rot vangen = -2 score + combo reset. Rot missen = neutraal (+0, geen leven kwijt).
		 * Goede tomaat missen = combo reset + 1 leven kwijt; 3 missers = vroegtijdig game over. */
		const ROTTEN_CHANCE = 0.18;
		const breakCombo = () => {
			combo = 0;
		};
		const addCatch = (isRotten) => {
			if (isRotten) {
				score = Math.max(score - 2, 0);
				breakCombo();
				setNote('Bah, rotte tomaat! −2 — combo weg.', false);
				return;
			}
			combo += 1;
			bestCombo = Math.max(bestCombo, combo);
			score += 1;
			/* Combo-regel: elke 5-combo levert 1 bonuspunt extra. */
			if (combo % 5 === 0) {
				score += 1;
				setNote(`Lekker bezig! Combo x${combo} — bonuspunt! Vang de tomaat 🍅`, false);
			} else if (combo >= 3) {
				setNote(`Combo x${combo}! Vang de tomaat 🍅`, false);
			}
			flashCombo();
		};
		const spawnTomato = () => {
			const el = document.createElement('span');
			const isRotten = Math.random() < ROTTEN_CHANCE;
			el.className = isRotten ? 'tomato tomato--rotten' : 'tomato';
			el.textContent = isRotten ? '🤢' : '🍅';
			el.setAttribute('aria-hidden', 'true');
			field.appendChild(el);
			items.push({
				el,
				x: 0.04 + Math.random() * 0.92,
				y: -34,
				speed: 150 + Math.random() * 130 + elapsed * 8 + (level - 1) * 40,
				done: false,
				rotten: isRotten,
			});
		};
		const endGame = (early) => {
			running = false;
			window.clearInterval(spawnTimer);
			window.clearInterval(countdownTimer);
			window.cancelAnimationFrame(rafId);
			if (score > best) {
				best = score;
				try {
					window.localStorage.setItem('tomatoBest', String(best));
				} catch (error) {
					/* private mode: best score is session-only */
				}
				if (bestEl) {
					bestEl.textContent = String(best);
				}
			}
			startBtn.disabled = false;
			startBtn.textContent = 'Opnieuw';
			if (early) {
				setNote(`Game over — 3 gemist! Score ${score} — best ${best}. Opnieuw?`, false);
			} else {
				setNote(`Tijd! Score ${score} — best ${best}${bestCombo >= 5 ? ` — topcombo x${bestCombo}` : ''}. Opnieuw?`, false);
			}
		};
		const frame = (timestamp) => {
			if (!running) {
				return;
			}
			const dt = Math.min((timestamp - lastTick) / 1000, 0.05);
			lastTick = timestamp;
			elapsed += dt;
			const width = field.clientWidth || 1;
			const height = field.clientHeight || 1;
			const basketMax = Math.max(width - basket.offsetWidth, 1);
			const basketCenter = basketX * basketMax + basket.offsetWidth / 2;
			const catchLine = height - 8 - basket.offsetHeight;
			const nextLevel = levelForElapsed(elapsed);
			if (nextLevel !== level) {
				level = nextLevel;
				window.clearInterval(spawnTimer);
				spawnTimer = window.setInterval(spawnTomato, spawnIntervalFor(elapsed));
				setNote(`Level ${level}! Het gaat sneller — vang de tomaat 🍅`, false);
			}
			renderHudExtra();
			items.forEach((item) => {
				if (item.done || !running) {
					return;
				}
				item.y += item.speed * dt;
				const itemCenter = item.x * width;
				if (item.y + 26 >= catchLine && item.y < height && Math.abs(itemCenter - basketCenter) < 36) {
					item.done = true;
					addCatch(item.rotten);
					if (scoreEl) {
						scoreEl.textContent = String(score);
					}
					item.el.classList.add('tomato--caught');
					window.setTimeout(() => item.el.remove(), 200);
				} else if (item.y > height) {
					item.done = true;
					if (item.rotten) {
						item.el.classList.add('tomato--missed');
					} else {
						lives -= 1;
						breakCombo();
						if (scoreEl) {
							scoreEl.textContent = String(score);
						}
						item.el.classList.add('tomato--missed');
						if (lives <= 0) {
							renderHudExtra();
							window.setTimeout(() => item.el.remove(), 200);
							items = items.filter((entry) => !entry.done);
							endGame(true);
							return;
						}
						setNote(`Mis! Nog ${lives} ${lives === 1 ? 'leven' : 'levens'} — vang de tomaat 🍅`, false);
					}
					window.setTimeout(() => item.el.remove(), 200);
				} else {
					item.el.style.transform = `translate(${(item.x * width).toFixed(1)}px,${item.y.toFixed(1)}px)`;
				}
			});
			items = items.filter((item) => !item.done);
			if (!running) {
				return;
			}
			rafId = window.requestAnimationFrame(frame);
		};
		const startGame = () => {
			if (running) {
				return;
			}
			running = true;
			score = 0;
			timeLeft = 30;
			elapsed = 0;
			level = 1;
			combo = 0;
			bestCombo = 0;
			lives = 3;
			basketX = 0.5;
			clearItems();
			renderHudExtra();
			if (scoreEl) {
				scoreEl.textContent = '0';
			}
			if (timeEl) {
				timeEl.textContent = '30';
			}
			startBtn.disabled = true;
			startBtn.textContent = 'Bezig…';
			setNote('Vang de tomaat 🍅 — ontwijk de rotte 🤢!', false);
			placeBasket();
			spawnTomato();
			spawnTimer = window.setInterval(spawnTomato, spawnIntervalFor(0));
			countdownTimer = window.setInterval(() => {
				timeLeft -= 1;
				if (timeEl) {
					timeEl.textContent = String(Math.max(timeLeft, 0));
				}
				if (timeLeft <= 0) {
					endGame();
				}
			}, 1000);
			lastTick = window.performance.now();
			rafId = window.requestAnimationFrame(frame);
		};
		field.addEventListener('pointermove', (event) => {
			const rect = field.getBoundingClientRect();
			basketX = clamp01((event.clientX - rect.left) / rect.width);
			placeBasket();
		});
		field.addEventListener('pointerdown', (event) => {
			const rect = field.getBoundingClientRect();
			basketX = clamp01((event.clientX - rect.left) / rect.width);
			placeBasket();
		});
		field.addEventListener('keydown', (event) => {
			if (event.key === 'ArrowLeft') {
				basketX = clamp01(basketX - 0.07);
				placeBasket();
				event.preventDefault();
			} else if (event.key === 'ArrowRight') {
				basketX = clamp01(basketX + 0.07);
				placeBasket();
				event.preventDefault();
			} else if (event.key === 'Home') {
				basketX = 0;
				placeBasket();
				event.preventDefault();
			} else if (event.key === 'End') {
				basketX = 1;
				placeBasket();
				event.preventDefault();
			}
		});
		window.addEventListener('resize', placeBasket);
		startBtn.addEventListener('click', startGame);
		placeBasket();
	});

	const portfolio = document.querySelector('#portfolio-content');
	if (portfolio) {
		portfolio.removeAttribute('aria-hidden');
	}
	document.body.classList.add('portal-entered');
});
