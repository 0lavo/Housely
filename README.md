# Housely

> Encontra a tua próxima casa em Portugal com a simplicidade de um swipe.

**Housely** é uma aplicação móvel desenvolvida em **React Native** que reinventa a forma de procurar imóveis para arrendar. Inspirada nas interfaces de *swipe* das apps de encontros, permite ao utilizador descobrir propriedades em **Aveiro**, **Lisboa** e **Porto** de uma forma rápida, visual e intuitiva.

---

## Funcionalidades

- **Interface de Swipe** — desliza para a direita para guardar, para a esquerda para descartar.
- **Filtros Inteligentes** — define orçamento, tipologia (T0–T3), localização e distância máxima.
- **Perfil Pessoal** — partilha preferências sobre animais, fumadores, género e número de colegas de casa.
- **Geolocalização** — usa a localização atual do dispositivo para encontrar imóveis próximos.
- **Favoritos Persistentes** — as casas guardadas mantêm-se entre sessões através do `AsyncStorage`.
- **Detalhes Completos** — vê área, quartos, casas de banho, descrição e abre o anúncio original no browser.
- **Onboarding** — modal de boas-vindas guia novos utilizadores até ao ecrã de filtros.

---

## Stack Tecnológico

| Camada | Tecnologia |
|---|---|
| **Framework** | React Native `0.85.2` + React `19.2.3` |
| **Linguagem** | TypeScript `5.9` |
| **Navegação** | React Navigation (Drawer + Native Stack) |
| **Animações** | React Native Reanimated + Animated API + PanResponder |
| **Storage** | AsyncStorage |
| **Localização** | `@react-native-community/geolocation` |
| **UI** | React Native Vector Icons, Element Dropdown, Multi-Slider |
| **Gestos** | React Native Gesture Handler |

---

## Estrutura do Projeto

Housely/
├── App.tsx # Entry point com GestureHandlerRootView
├── assets/ # Fontes (Alexandria) e imagens
├── data/ # Datasets locais de imóveis (JSON)
│ ├── aveiroProperties.json
│ ├── lisboaProperties.json
│ └── portoProperties.json
└── src/
├── components/ # Componentes reutilizáveis (Cards, Modais, Header, Footer)
├── navigation/ # AppNavigator + DrawerNavigator
├── screens/ # Home, Filter, Favorite, PropertyDetails
├── services/ # Serviço de geolocalização
├── storage/ # Wrappers do AsyncStorage (liked, filters, firstTime)
├── styles/ # Estilos globais e por ecrã
└── utils/ # filterProperties + cálculo Haversine


---

## Como Executar

### Pré-requisitos

- **Node.js** `>= 22.11.0`
- **React Native CLI** configurado ([guia oficial](https://reactnative.dev/docs/set-up-your-environment))
- Android Studio (para Android) ou Xcode (para iOS)

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/0lavo/Housely.git
cd Housely

# 2. Instalar dependências
npm install

#. 3 Correr o App
npm run android   # Android
