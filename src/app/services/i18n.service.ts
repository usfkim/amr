import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Translation {
  [key: string]: string | Translation;
}

interface Language {
  code: string;
  name: string;
  flag: string;
  rtl: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private currentLanguage = new BehaviorSubject<string>('en');
  private translations: { [lang: string]: Translation } = {};

  readonly supportedLanguages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸', rtl: false },
    { code: 'fr', name: 'Français', flag: '🇫🇷', rtl: false },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', rtl: true }
  ];

  constructor() {
    this.loadTranslations();
    this.initializeLanguage();
  }

  getCurrentLanguage(): Observable<string> {
    return this.currentLanguage.asObservable();
  }

  setLanguage(langCode: string): void {
    if (this.supportedLanguages.find(lang => lang.code === langCode)) {
      this.currentLanguage.next(langCode);
      localStorage.setItem('amr_language', langCode);
      this.updateDocumentDirection(langCode);
    }
  }

  translate(key: string, params?: { [key: string]: string }): string {
    const lang = this.currentLanguage.value;
    const translation = this.getNestedTranslation(this.translations[lang] || this.translations['en'], key);
    
    if (params && typeof translation === 'string') {
      return this.interpolateParams(translation, params);
    }
    
    return typeof translation === 'string' ? translation : key;
  }

  isRTL(): boolean {
    const lang = this.supportedLanguages.find(l => l.code === this.currentLanguage.value);
    return lang?.rtl || false;
  }

  private loadTranslations(): void {
    // English translations (default)
    this.translations['en'] = {
      common: {
        verify: 'Verify',
        register: 'Register',
        contact: 'Contact',
        about: 'About',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success'
      },
      home: {
        hero: {
          title: 'One Africa. One Health Identity.',
          subtitle: 'Building Africa\'s trusted health verification platform where every doctor, nurse, pharmacist, medical herbalist, and health professional can be verified with a scan.'
        }
      },
      navigation: {
        solutions: 'Solutions',
        technology: 'Technology',
        countries: 'Countries',
        resources: 'Resources'
      }
    };

    // French translations
    this.translations['fr'] = {
      common: {
        verify: 'Vérifier',
        register: 'S\'inscrire',
        contact: 'Contact',
        about: 'À propos',
        loading: 'Chargement...',
        error: 'Erreur',
        success: 'Succès'
      },
      home: {
        hero: {
          title: 'Une Afrique. Une Identité Santé.',
          subtitle: 'Construire la plateforme de vérification santé de confiance de l\'Afrique où chaque médecin, infirmière, pharmacien, herboriste médical et professionnel de santé peut être vérifié d\'un scan.'
        }
      },
      navigation: {
        solutions: 'Solutions',
        technology: 'Technologie',
        countries: 'Pays',
        resources: 'Ressources'
      }
    };

    // Arabic translations
    this.translations['ar'] = {
      common: {
        verify: 'تحقق',
        register: 'سجل',
        contact: 'اتصل',
        about: 'حول',
        loading: 'جاري التحميل...',
        error: 'خطأ',
        success: 'نجح'
      },
      home: {
        hero: {
          title: 'أفريقيا واحدة. هوية صحية واحدة.',
          subtitle: 'بناء منصة التحقق الصحي الموثوقة في أفريقيا حيث يمكن التحقق من كل طبيب وممرضة وصيدلي وطبيب أعشاب ومهني صحي بمسح ضوئي.'
        }
      },
      navigation: {
        solutions: 'الحلول',
        technology: 'التكنولوجيا',
        countries: 'البلدان',
        resources: 'الموارد'
      }
    };
  }

  private getNestedTranslation(obj: Translation, key: string): string | Translation {
    const keys = key.split('.');
    let current: any = obj;
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return current;
  }

  private interpolateParams(text: string, params: { [key: string]: string }): string {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => params[key] || match);
  }

  private initializeLanguage(): void {
    const savedLang = localStorage.getItem('amr_language');
    const browserLang = navigator.language.split('-')[0];
    const defaultLang = savedLang || (this.supportedLanguages.find(l => l.code === browserLang)?.code) || 'en';
    
    this.setLanguage(defaultLang);
  }

  private updateDocumentDirection(langCode: string): void {
    const isRTL = this.supportedLanguages.find(l => l.code === langCode)?.rtl || false;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = langCode;
  }
}