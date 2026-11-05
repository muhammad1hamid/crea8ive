export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
export const GOOGLE_MAPS_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID";

declare global {
  interface Window {
    google?: {
      maps?: {
        importLibrary?: (name: string) => Promise<unknown>;
      };
    };
    __crea8ivGoogleMapsLoader?: Promise<void>;
  }
}

export function loadGoogleMaps(apiKey: string) {
  if (typeof window === "undefined") return Promise.reject(new Error("Window is unavailable."));
  if (window.google?.maps?.importLibrary) return Promise.resolve();

  if (!window.__crea8ivGoogleMapsLoader) {
    window.__crea8ivGoogleMapsLoader = new Promise<void>((resolve, reject) => {
      if (!document.getElementById("cm-google-maps-bootstrap")) {
        const script = document.createElement("script");
        script.id = "cm-google-maps-bootstrap";
        script.text = `(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=\`https://maps.\${c}apis.com/maps/api/js?\`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({key:${JSON.stringify(apiKey)},v:"weekly"});`;
        document.head.append(script);
      }

      let attempts = 0;
      const waitForLoader = () => {
        if (window.google?.maps?.importLibrary) {
          resolve();
          return;
        }
        attempts += 1;
        if (attempts > 100) {
          reject(new Error("Google Maps loader did not initialize."));
          return;
        }
        window.setTimeout(waitForLoader, 50);
      };

      waitForLoader();
    });
  }

  return window.__crea8ivGoogleMapsLoader;
}
