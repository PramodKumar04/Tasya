const mongoose = require("mongoose");

const samplePosts =
  [
    {
      "_id": "6873671dbba2a0bbc70ad14b",
      "author": "68735376fb9864bffdb5f899",
      "title": "Real dark will.",
      "content": "In the intricate dance of human motivation, the phrase 'real dark will' captures a psychological depth often overshadowed by surface-level emotions. This internal will—silent, stubborn, and fiercely determined—emerges not in moments of triumph, but in the crucible of adversity. It is not driven by external praise or visible success, but by an innate, often mysterious drive to persevere, to endure, to push boundaries. It is the will that keeps an artist painting in poverty, a scientist experimenting despite failure, or a mother shielding her child from chaos. Unlike hope, which looks forward to light, the dark will embraces the unknown, thrives in silence, and gives birth to legacies that outlive temporary fame.",
      "video": { "url": "", "file": "" },
      "image": {
        "url": "https://images.unsplash.com/photo-1680159452310-a1ad0cf8b813?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "file": ""
      },
      "likes": 48,
      "comments": ["6873671dbba2a0bbc70ad141", "6873671dbba2a0bbc70ad142"],
      "category": "art",
      "createdAt": "2024-10-04T14:23:54.000Z",
      "__v": 11,
      "likedBy": [null],
      "updatedAt": "2025-07-15T15:35:18.036Z"
    },
    {
      "_id": "6873671dbba2a0bbc70ad14c",
      "author": "68735376fb9864bffdb5f899",
      "title": "Discover whom city while his building heart hundred.",
      "content": "Cities are more than just concrete jungles or architectural feats. They are living, breathing tapestries of culture, identity, struggle, and triumph. When we talk about discovering a person in the city, we are acknowledging how urban landscapes shape the human soul. In bustling metros, every heart beats with stories of ambition, love, pain, and rebirth. Buildings become metaphors for dreams—skyscrapers representing limitless aspirations, while forgotten alleyways mirror suppressed voices. This piece explores how environments reflect and mold identities—how someone walking past the same café daily forms a part of its silent memory, and how a city, in turn, molds the temperament, values, and dreams of those who call it home.",
      "video": { "url": "", "file": "" },
      "image": {
        "url": "https://images.unsplash.com/photo-1588434538854-8192be18c43a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "file": ""
      },
      "likes": 481,
      "comments": [],
      "category": "blog",
      "createdAt": "2024-11-09T07:36:50.000Z",
      "__v": 7,
      "likedBy": [null],
      "updatedAt": "2025-07-15T15:42:22.524Z"
    },
    {
      "_id": "6873671dbba2a0bbc70ad14d",
      "author": "68735376fb9864bffdb5f899",
      "title": "Cultural light child.",
      "content": "A child of cultural light is not bound by tradition, nor is he entirely free from it. He is illuminated by it. From lullabies whispered in ancestral languages to the stories embedded in dance, food, and rituals, culture becomes both compass and canvas. Such a child grows not just with academic learning, but with wisdom carried through generations—oral histories, folk songs, and festival rhythms. This light is not always visible. It radiates in moments of empathy, in the resilience against discrimination, and in the pride of one’s roots. The modern world often pulls children away from their cultural identities, but those who carry this light become bridges between the old and new, shaping inclusive futures while honoring rich pasts.",
      "video": { "url": "", "file": "" },
      "image": {
        "url": "https://images.unsplash.com/photo-1662833231337-f7c0659d0ef8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "file": ""
      },
      "likes": 893,
      "comments": [],
      "category": "art",
      "createdAt": "2025-03-23T22:00:39.000Z",
      "__v": 7,
      "likedBy": [null],
      "updatedAt": "2025-07-15T15:42:20.365Z"
    },
    {
      "_id": "6873671dbba2a0bbc70ad14e",
      "author": "68735376fb9864bffdb5f899",
      "title": "Tree event south stop door laugh nearly.",
      "content": "Nature often becomes the silent witness to human emotion. A tree at the edge of a southern field might bear the laughter of generations or shelter secrets told under its branches. In many cultures, trees symbolize life, rootedness, and wisdom. This narrative explores a fictional event where a seemingly ordinary tree near a southern town becomes the backdrop for memories, reunions, and farewells. Doors close, people move, but the tree remains—constant and compassionate. It’s not just wood and leaves; it’s a living relic of stories, a symbol of home, of change, and of things that remain even when time flows forward.",
      "video": { "url": "", "file": "" },
      "image": {
        "url": "https://images.unsplash.com/photo-1734980247542-74f081bd61f1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "file": ""
      },
      "likes": 99,
      "comments": [],
      "category": "review",
      "createdAt": "2025-01-25T20:07:45.000Z",
      "__v": 5,
      "likedBy": [null],
      "updatedAt": "2025-07-14T05:59:27.343Z"
    },
    {
      "_id": "6873671dbba2a0bbc70ad14f",
      "author": "68735376fb9864bffdb5f899",
      "title": "Ability skin stage ball official course account.",
      "content": "In a world obsessed with performance, the phrase 'skin stage ball' can be interpreted as the theater of identity. People wear identities like costumes—race, gender, role, occupation—all performed on a social stage. This essay explores how society judges ability not just by actual competence, but by perceived image, official credentials, and curated online presence. The 'course account' refers to our life trajectory, one that is often monitored, rated, and tracked like an academic course. But behind every staged performance lies a human being struggling with self-worth, authenticity, and the need for genuine connection. This piece calls for introspection: are we truly living our truths, or are we acting our lives away?",
      "video": { "url": "", "file": "" },
      "image": {
        "url": "https://images.unsplash.com/photo-1628977087854-1f0588b91034?q=80&w=1212&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "file": ""
      },
      "likes": 243,
      "comments": [],
      "category": "vlogs",
      "createdAt": "2025-01-22T15:04:50.000Z",
      "__v": 7,
      "likedBy": [null],
      "updatedAt": "2025-07-16T06:19:32.322Z"
    },
    {
      "_id": "6873671dbba2a0bbc70ad150",
      "author": "68735376fb9864bffdb5f899",
      "title": "Catch exist social left traditional into.",
      "content": "Tradition is both a foundation and a burden. In a world where social values are constantly evolving, those who choose to 'catch' and retain traditions are often seen as resisting progress. But tradition has its own rhythm, its own wisdom. This essay discusses the tension between the modern social fabric and traditional roots. What does it mean to exist within both spheres? Can a person retain their cultural essence while embracing progressive values? The piece explores how individuals navigate identity, choice, generational pressures, and the fear of losing cultural heritage in the race toward globalization.",
      "video": { "url": "", "file": "" },
      "image": {
        "url": "https://images.unsplash.com/photo-1595378883545-a1d7793a020c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2F0Y2glMjBleGlzdCUyMHNvY2lhbCUyMGxlZnQlMjB0cmFkaXRpb25hbCUyMGludG8lMjBmcmVlfGVufDB8fDB8fHww",
        "file": "Congress.jpg"
      },
      "likes": 566,
      "comments": [],
      "category": "review",
      "createdAt": "2024-07-30T15:14:53.000Z",
      "__v": 1,
      "likedBy": [null],
      "updatedAt": "2025-07-14T05:59:31.411Z"
    },
    {
      "_id": "6873671dbba2a0bbc70ad151",
      "author": "68735376fb9864bffdb5f899",
      "title": "Control near product bar indeed marriage population.",
      "content": "Modern society finds itself in a constant tug-of-war between autonomy and conformity. The phrase 'control near product' implies the invisible hand guiding consumption, relationships, and even personal beliefs. Marriage, once sacred, is now influenced by algorithms, financial planning, and social optics. Population trends are no longer just demographic data—they influence marketing, politics, and even healthcare. This essay critiques how personal milestones are increasingly shaped by societal expectations, manipulated desires, and market forces. In such a world, finding authentic love or purpose demands consciousness, resistance, and radical vulnerability.",
      "video": { "url": "", "file": "until.mp4" },
      "image": {
        "url": "https://plus.unsplash.com/premium_photo-1681841585407-8cc4d427783c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Q29udHJvbCUyMG5lYXIlMjBwcm9kdWN0JTIwYmFyJTIwaW5kZWVkJTIwbWFycmlhZ2UlMjBwb3B1bGF0aW9uJTIwZnJlZXxlbnwwfHwwfHx8MA%3D%3D",
        "file": ""
      },
      "likes": 337,
      "comments": [],
      "category": "review",
      "createdAt": "2024-12-31T02:54:37.000Z",
      "__v": 3,
      "likedBy": [null],
      "updatedAt": "2025-07-14T05:59:29.312Z"
    },
    {
      "_id": "687368c772cc61a868b5f89c",
      "title": "F1 Movie Review: A High-Octane Tribute to Speed",
      "content": "F1 is more than just a motorsport — it’s a symphony of speed, engineering brilliance, and human tenacity. This film doesn't just follow the races; it explores the inner machinery of ambition and fear that powers the paddock. The cinematography brings the roaring engines to life, capturing not only the cars on the track but also the quiet moments of vulnerability in the garages and briefing rooms. The emotional arcs of the drivers — their rivalries, sacrifices, and personal battles — are woven into the narrative like well-calculated pit strategies. With a score that pulses like a heartbeat and direction that respects both legacy and innovation, the film transcends genre boundaries. Whether you're a die-hard F1 fan or a casual moviegoer, it delivers a cinematic thrill that lingers long after the final lap. It’s a tribute to how passion, precision, and pain coexist on the world's fastest stage.",
      "author": "68735376fb9864bffdb5f899",
      "category": "review",
      "createdAt": "2025-07-13T08:05:27.600Z",
      "image": {
        "url": "https://corp.formula1.com/wp-content/uploads/2025/03/F1_WBDO_FEATURED_IMAGE_MAIN_1920x1080-1.jpg",
        "file": ""
      },
      "video": { "url": "", "file": "" },
      "likes": 901,
      "comments": [],
      "__v": 7,
      "likedBy": [null],
      "updatedAt": "2025-07-15T16:27:38.018Z"
    },
    {
      "_id": "6873692a72cc61a868b5f89d",
      "title": "Interstellar Review: A Masterpiece of Space, Time, and Emotion",
      "content": "Christopher Nolan’s *Interstellar* is not merely a sci-fi movie — it is a cinematic meditation on love, loss, and the relentless curiosity that defines humanity. The film asks profound questions: Can love transcend dimensions? Is survival enough without meaning? With haunting visuals of Saturn’s rings, dust-covered Earth, and the oceanic vastness of alien worlds, the movie immerses viewers in the stark contrast between the known and the unknowable. Hans Zimmer’s score, a character in itself, reverberates through the soul, creating moments of stillness amidst chaos. The portrayal of time dilation — where a minute on one planet equals years on Earth — serves not just as a plot device but a metaphor for how time slips away when we are far from the people we love. Cooper’s bond with his daughter, Murph, anchors the story, proving that the strongest force in the universe may not be gravity but the emotional ties we form. *Interstellar* is not just a film; it’s an experience that echoes long after the end credits roll.",
      "author": "68735376fb9864bffdb5f899",
      "category": "review",
      "createdAt": "2025-07-13T08:07:06.682Z",
      "image": {
        "url": "https://images.alphacoders.com/129/thumb-1920-1299427.jpg",
        "file": ""
      },
      "video": { "url": "", "file": "" },
      "likes": 1000,
      "comments": [],
      "__v": 3,
      "likedBy": [null],
      "updatedAt": "2025-07-13T12:01:09.353Z"
    },


  ];



module.exports = { data: samplePosts };
