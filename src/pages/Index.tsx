import { MainHeader } from "@/components/ApiDocs/MainHeader";
import { ApiDocsHeader } from "@/components/ApiDocs/Header";
import { AuthSection } from "@/components/ApiDocs/AuthSection";
import { EndpointCard } from "@/components/ApiDocs/EndpointCard";
import { HelpSection } from "@/components/ApiDocs/HelpSection";
import { PricingSection } from "@/components/ApiDocs/PricingSection";
import {QuickTest} from "@/components/ApiDocs/QuickTest.tsx";

const Index = () => {
  const getTrackExamples = {
    query: `import requests as r

url = "https://tgmusic.fallenapi.fun/get_track"
params = {
    "api_key": "Your api key here",
    "url": "https://www.youtube.com/watch?v=z3UHfi9vpbc"
}

req = r.get(url, params=params)

print(req.json())`,
    header: `import requests as r

url = "https://tgmusic.fallenapi.fun/get_track"
headers = {
    "X-API-Key": "Your api key here"
}
params = {
    "url": "https://www.youtube.com/watch?v=z3UHfi9vpbc"
}

req = r.get(url, headers=headers, params=params)

print(req.json())`
  };

  const getTrackResponse = `{
  "cdnurl": "https://t.me/FALLENAPI/6952",
  "key": "",
  "name": "Sunn Raha Hai Na Tu Aashiqui 2 Full Song With Lyrics | Aditya Roy Kapur, Shraddha Kapoor",
  "artist": "T-Series",
  "tc": "z3UHfi9vpbc",
  "cover": "https://i.ytimg.com/vi/z3UHfi9vpbc/hqdefault.jpg",
  "artists": [{"name": "T-Series"}],
  "album": "T-Series",
  "year": 2025,
  "duration": 23400,
  "lyrics": "",
  "url": "https://www.youtube.com/watch?v=z3UHfi9vpbc",
  "platform": "youtube"
}`;

  const getUrlExamples = {
    query: `import requests as r

url = "https://tgmusic.fallenapi.fun/get_url"
params = {
    "api_key": "Your api key here",
    "url": "https://open.spotify.com/artist/4YRxDV8wJFPHPTeXepOstw"
}

req = r.get(url, params=params)

print(req.json())`,
    header: `import requests as r

url = "https://tgmusic.fallenapi.fun/get_url"
headers = {
    "X-API-Key": "Your api key here"
}
params = {
    "url": "https://open.spotify.com/artist/4YRxDV8wJFPHPTeXepOstw"
}

req = r.get(url, headers=headers, params=params)

print(req.json())`
  };

  const getUrlResponse = `{
  "results": [
    {
      "name": "Dhun (From \\"Saiyaara\\")",
      "artist": "Mithoon",
      "id": "1GFQthxDi4Tqe3wJ5j0G5S",
      "year": "2025",
      "cover": "https://i.scdn.co/image/ab67616d0000b273781faf59a3cb980fe3b493f8",
      "cover_small": "https://i.scdn.co/image/ab67616d00004851781faf59a3cb980fe3b493f8",
      "duration": 276,
      "url": "https://open.spotify.com/track/1GFQthxDi4Tqe3wJ5j0G5S",
      "platform": "spotify"
    },
    {
      "name": "Apna Bana Le",
      "artist": "Sachin-Jigar",
      "id": "1hA697u7e1jX2XM8sWA6Uy",
      "year": "2022",
      "cover": "https://i.scdn.co/image/ab67616d0000b273b85b4e8fb6ba961aedfde386",
      "cover_small": "https://i.scdn.co/image/ab67616d00004851b85b4e8fb6ba961aedfde386",
      "duration": 261,
      "url": "https://open.spotify.com/track/1hA697u7e1jX2XM8sWA6Uy",
      "platform": "spotify"
    }
  ]
}`;

  const snapExamples = {
    query: `import requests as r

url = "https://tgmusic.fallenapi.fun/snap"
params = {
    "api_key": "Your api key here",
    "url": "https://www.instagram.com/p/DMvZt5tTeTF/"
}

req = r.get(url, params=params)

print(req.json())`,
    header: `import requests as r

url = "https://tgmusic.fallenapi.fun/snap"
headers = {
    "X-API-Key": "Your api key here"
}
params = {
    "url": "https://www.instagram.com/p/DMvZt5tTeTF/"
}

req = r.get(url, headers=headers, params=params)

print(req.json())`
  };

  const snapResponse = `{
  "video": [
    {
      "video": "https://scontent-yyz1-1.cdninstagram.com/o1/v/t16/f2/m84/AQMZOjq2ms-52UR8irW3r11av5NOfq5KQF5TeNKC-xahVXnyPNZWz5iZD_mPCOx8O5enkAgvpgL0b1zJ_vjBVU-iYoJTAlNpcSrD5lk.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2Fyb3VzZWxfaXRlbS5jMi43MjAuYmFzZWxpbmUifQ&_nc_cat=108&vs=1397823771287939_187074088&_nc_vs=HBkcFQIYTGlnX2JhY2tmaWxsX3RpbWVsaW5lX3ZvZC8yNDQwRjg5NzRDNUE4QzMzMjhFRjA0QzczRkU3RTU5OF92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAKAAYABsAFQAAJsS02OCwucc%2FFQIoAkMzLBdAFKn752yLRBgSZGFzaF9iYXNlbGluZV8xX3YxEQB17gdlxJ4BAA%3D%3D&_nc_rid=5b6df401ee&ccb=9-4&oh=00_AfXiU-_4SLzGrUiPCmtxvDsJ-SZ-hv53-sA6HczZO0swAQ&oe=68924A7F&_nc_sid=10d13b",
      "thumbnail": "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/525844917_18151293442384308_3763330696892658598_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2QFUVA1-YPjbXQ-E7HD0VmKxxIqsnyCiy-BElzCXZo4gdXct3YGQa9HkOAFEuxecLIw&_nc_ohc=Ofp2U0fLnEUQ7kNvwGTvIca&_nc_gid=n9rhYFeVmTDC49GQ_MumyA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfXuUeUjPl9Uz7DoPwOa6xJacehc_9rGJkHtSA5X-LU08w&oe=689621E5&_nc_sid=10d13b"
    }
  ],
  "image": [
    "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/526752102_18151293349384308_2770595130934380380_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2QFUVA1-YPjbXQ-E7HD0VmKxxIqsnyCiy-BElzCXZo4gdXct3YGQa9HkOAFEuxecLIw&_nc_ohc=ylnQ2BiwKSwQ7kNvwGRghmr&_nc_gid=n9rhYFeVmTDC49GQ_MumyA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfW2ino2eJA2GdJmxOxaW0anYsm8FIkTT5NYDwudi5rwRA&oe=68963F1F&_nc_sid=10d13b",
    "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/525968020_18151293358384308_6281507440102553008_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=1&_nc_oc=Q6cZ2QFUVA1-YPjbXQ-E7HD0VmKxxIqsnyCiy-BElzCXZo4gdXct3YGQa9HkOAFEuxecLIw&_nc_ohc=XTs5nGYhUKUQ7kNvwFPunxB&_nc_gid=n9rhYFeVmTDC49GQ_MumyA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfVWT4UrWRX6DiSIW5Rsky9gGviPv4qaDMQy2sdxhb_otg&oe=68961D23&_nc_sid=10d13b",
    "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/526653577_18151293370384308_1652572035077609463_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2QFUVA1-YPjbXQ-E7HD0VmKxxIqsnyCiy-BElzCXZo4gdXct3YGQa9HkOAFEuxecLIw&_nc_ohc=QcbEzG6F1n0Q7kNvwEvN6Be&_nc_gid=n9rhYFeVmTDC49GQ_MumyA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfXoYxyLycs_o2Nd0kMafesJRqvq5hBfnH663aSGssZtLw&oe=68961455&_nc_sid=10d13b",
    "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/525761645_18151293379384308_4051547494930707604_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2QFUVA1-YPjbXQ-E7HD0VmKxxIqsnyCiy-BElzCXZo4gdXct3YGQa9HkOAFEuxecLIw&_nc_ohc=N19o-ESHAXYQ7kNvwFEyhih&_nc_gid=n9rhYFeVmTDC49GQ_MumyA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfWW6QwXH9jCqI8OPGFZ8hsnpf2QHoMTzNvCtDx3tD1Gag&oe=68961251&_nc_sid=10d13b",
    "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/526620206_18151293388384308_674351246501224013_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2QFUVA1-YPjbXQ-E7HD0VmKxxIqsnyCiy-BElzCXZo4gdXct3YGQa9HkOAFEuxecLIw&_nc_ohc=vXk-KdrTgdwQ7kNvwFPunxB&_nc_gid=n9rhYFeVmTDC49GQ_MumyA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfXgnyry0JSuCddVqtm-P-3Pov4I-rjGHAer-nbSAv8fzA&oe=68961FEF&_nc_sid=10d13b",
    "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/526671371_18151293397384308_5083905527562004022_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2QFUVA1-YPjbXQ-E7HD0VmKxxIqsnyCiy-BElzCXZo4gdXct3YGQa9HkOAFEuxecLIw&_nc_ohc=b-_pUjEMDqIQ7kNvwFgvL1u&_nc_gid=n9rhYFeVmTDC49GQ_MumyA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfVVtMa22lo7jigGP1BYO7bTMPPYFkisWOv50F46fU2BSQ&oe=68961287&_nc_sid=10d13b",
    "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/525948293_18151293406384308_983660461962414207_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2QFUVA1-YPjbXQ-E7HD0VmKxxIqsnyCiy-BElzCXZo4gdXct3YGQa9HkOAFEuxecLIw&_nc_ohc=Qap49uFfLJoQ7kNvwFZMpDK&_nc_gid=n9rhYFeVmTDC49GQ_MumyA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfUmm0QjAzVmi0rgkd7AtMZsDRgBYKfESzqp-DDRe8U2jw&oe=689646FE&_nc_sid=10d13b",
    "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/525919246_18151293415384308_5610342417235710085_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2QFUVA1-YPjbXQ-E7HD0VmKxxIqsnyCiy-BElzCXZo4gdXct3YGQa9HkOAFEuxecLIw&_nc_ohc=c4-DFNx0TFQQ7kNvwFHjbZF&_nc_gid=n9rhYFeVmTDC49GQ_MumyA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfUGkQkEMDP801WgIpcvElY9MzlH8aY4nyX2eu4s4jyYig&oe=689631B9&_nc_sid=10d13b",
    "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/525767270_18151293424384308_7504178429300632318_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2QFUVA1-YPjbXQ-E7HD0VmKxxIqsnyCiy-BElzCXZo4gdXct3YGQa9HkOAFEuxecLIw&_nc_ohc=Fc301cTJBOUQ7kNvwG6AJsI&_nc_gid=n9rhYFeVmTDC49GQ_MumyA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfXNgeaPnMhui3HFijan1qZevOtqXovjzNKH7mSZ-5dTsQ&oe=68961827&_nc_sid=10d13b",
    "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/526372285_18151293433384308_8780781852550723603_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=1&_nc_oc=Q6cZ2QFUVA1-YPjbXQ-E7HD0VmKxxIqsnyCiy-BElzCXZo4gdXct3YGQa9HkOAFEuxecLIw&_nc_ohc=gzb_ayGRhosQ7kNvwHNJTys&_nc_gid=n9rhYFeVmTDC49GQ_MumyA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfXyYIas1nur-wK9_mVO-CTKFpyDiTWeldV9i499CtRWyA&oe=68963E8E&_nc_sid=10d13b",
    "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/525452551_18151293451384308_3970447066133888940_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2QFUVA1-YPjbXQ-E7HD0VmKxxIqsnyCiy-BElzCXZo4gdXct3YGQa9HkOAFEuxecLIw&_nc_ohc=38G9cuWz8dkQ7kNvwFMlDLN&_nc_gid=n9rhYFeVmTDC49GQ_MumyA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfV_TwNa0Mn4JMjH3kU52bpKFq9eWPCB0ai-O_QsffR9kQ&oe=689642EE&_nc_sid=10d13b",
    "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/526368235_18151293460384308_431570861796242806_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2QFUVA1-YPjbXQ-E7HD0VmKxxIqsnyCiy-BElzCXZo4gdXct3YGQa9HkOAFEuxecLIw&_nc_ohc=qHkL54eR2dMQ7kNvwHbDEai&_nc_gid=n9rhYFeVmTDC49GQ_MumyA&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfXbjGxf4_GD9AvjuWeKocZaLvvTdcoPMkQ0vjjeSNlanA&oe=68963762&_nc_sid=10d13b"
  ],
  "fetch": true
}`;

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <ApiDocsHeader />
      
      <div className="container mx-auto px-4 sm:px-6 mt-8">
        <nav className="mb-8 flex flex-wrap gap-4 justify-center text-base font-medium">
          <a href="#auth" className="hover:underline text-primary">Authentication</a>
          <a href="#endpoints" className="hover:underline text-primary">API Endpoints</a>
          <a href="#pricing" className="hover:underline text-primary">Pricing</a>
          <a href="#projects" className="hover:underline text-primary">Projects</a>
          <a href="#quick-test" className="hover:underline text-primary">Quick Test</a>
        </nav>
      </div>
      
      <section id="auth">
        <AuthSection />
      </section>
      
      <section id="endpoints" className="py-8 sm:py-12 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">API Endpoints</h2>
          
          <EndpointCard
            method="GET"
            endpoint="/get_track"
            title="Get Track Information"
            description="Extract detailed track information from music platform URLs including metadata, CDN URL, and lyrics."
            platforms={["YouTube", "Spotify", "Apple Music", "SoundCloud"]}
            parameters={[
              {
                name: "url",
                type: "string",
                required: true,
                description: "The URL of the track from a supported music platform"
              },
              {
                name: "api_key",
                type: "string",
                required: false,
                description: "Your API key (required only when not using X-API-Key header)"
              }
            ]}
            requestExamples={getTrackExamples}
            responseExample={getTrackResponse}
          />

          <EndpointCard
            method="GET"
            endpoint="/get_url"
            title="Get Track List"
            description="Retrieve a list of tracks from playlist, album, or artist URLs from music platforms."
            platforms={["YouTube", "Spotify", "Apple Music", "SoundCloud"]}
            parameters={[
              {
                name: "url",
                type: "string",
                required: true,
                description: "The URL of the playlist, album, or artist from a supported music platform"
              },
              {
                name: "api_key",
                type: "string",
                required: false,
                description: "Your API key (required only when not using X-API-Key header)"
              }
            ]}
            requestExamples={getUrlExamples}
            responseExample={getUrlResponse}
          />

          <EndpointCard
            method="GET"
            endpoint="/snap"
            title="Download Social Media Content"
            description="Download videos and images from social media posts with high quality preservation."
            platforms={["Instagram", "Twitter", "Facebook", "TikTok", "Threads"]}
            parameters={[
              {
                name: "url",
                type: "string",
                required: true,
                description: "The URL of the social media post to download content from"
              },
              {
                name: "api_key",
                type: "string",
                required: false,
                description: "Your API key (required only when not using X-API-Key header)"
              }
            ]}
            requestExamples={snapExamples}
            responseExample={snapResponse}
          />
        </div>
      </section>

      <section id="pricing">
        <PricingSection />
      </section>

      <section id="projects" className="py-12 sm:py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Projects Using This API
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover amazing applications built with our powerful music and media API
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* FallenBeatZBot Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-8">
                <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                  <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-center mb-3 text-foreground">FallenBeatzBot</h3>
                <p className="text-muted-foreground text-center mb-8 leading-relaxed">
                  Experience seamless music in your Telegram voice chats with high-quality audio streaming
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => window.open('https://t.me/FallenBeatZBot', '_blank')}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-semibold hover:from-primary/90 hover:to-primary transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 select-none"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    Try Bot
                  </button>
                  <button 
                    onClick={() => window.open('https://github.com/AshokShau/TgMusicBot', '_blank')}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border hover:border-primary/50 text-foreground font-semibold hover:bg-primary/5 transition-all duration-200 select-none"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                     View on GitHub
                  </button>
                </div>
              </div>
            </div>

            {/* SpTubeBot Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-8">
                <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto rounded-2xl bg-gradient-to-br from-accent to-accent/80 shadow-lg">
                  <svg className="w-8 h-8 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-center mb-3 text-foreground">SpTubeBot</h3>
                <p className="text-muted-foreground text-center mb-8 leading-relaxed">
                  Download songs in high quality from multiple platforms with advanced search capabilities
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => window.open('https://t.me/NoiNoi_Bot', '_blank')}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent/90 text-accent-foreground font-semibold hover:from-accent/90 hover:to-accent transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 select-none"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    Try Bot
                  </button>
                  <button 
                    onClick={() => window.open('https://github.com/AshokShau/SpTubeBot', '_blank')}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border hover:border-accent/50 text-foreground font-semibold hover:bg-accent/5 transition-all duration-200 select-none"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View on GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HelpSection />

      <section id="quick-test">
        <QuickTest />
      </section>

      <footer className="bg-card border-t border-border py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-muted-foreground text-sm sm:text-base">
            Built with ❤️ for developers by{" "}
            <a 
              href="https://github.com/Ashokshau" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              AshokShau
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
