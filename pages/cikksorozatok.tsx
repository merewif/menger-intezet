import {NextSeo} from 'next-seo';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import {getFilteredPostData, getPostBySearchQuery} from '../helpers/getPosts';
import styles from '../styles/Collections.module.scss';
import {Collection, CollectionsParams, CollectionWithoutData} from '../types/Collections';
import * as _ from 'lodash';

const COLLECTIONS: Array<CollectionWithoutData> = [
  {
    name: 'Infláció vagy árstabilitás?',
    articles: [
      'Tóth András: A pénz és az állami pénzverési monopólium kialakulása (1. rész)',
      'Tóth András: Az európai pénzfejlődés politikai gazdaságtana (2. rész)',
    ],
  },
  {
    name: 'Oktatás',
    articles: [
      'Nathaniel Branden: Az oktatásnak államinak kell lennie? Közkeletű tévhitek a kapitalizmusról',
      'David D. Friedman: A közoktatás melletti érvek gyengéi (első rész)',
      'David D. Friedman: A közoktatás melletti érvek gyengéi (második rész)',
      'Bryan Caplan: Mi értelme van a felsőoktatásnak?',
    ],
  },
  {
    name: 'Adóztatás, újraelosztás',
    articles: [
      'Ludwig von Mises: Adóztatás',
      'Murray N. Rothbard: Az állami támogatásokról',
      'Radácsy László: Az egyenlőségről, őszintén',
    ],
  },
  {
    name: 'Piaci rend',
    articles: [
      'Sheldon Richman: A szabályozást akarók tévedése',
      'Charles W. Johnson: A piaci erők mi vagyunk',
      'David D. Friedman: Az erény és a bűn közgazdaságtana',
      'Howard Baetjer Jr.: Szabályozatlan piac nem létezik',
    ],
  },
  {
    name: 'Szociálpolitika',
    articles: [
      'David D. Friedman: Az áruló Robin Hood',
      'Némethné Pál Katalin: A szociálpolitika évszázados tévedése',
      'Joshua Fulton: Jóléti intézmények a jóléti állam előtt',
      'Radácsy László: Létezhet-e kapitalista szociálpolitika?',
    ],
  },
  {
    name: 'Egyenlőtlenség',
    articles: [
      'Yaron Brook: A gazdasági egyenlőség erkölcstelen eszme',
      'Thomas Sowell: A jövedelem „elosztási” statisztikák – és ami mögöttük van',
      'Némethné Pál Katalin: Mesék a kapitalizmus alaptörvényeiről (Piketty-bírálat)',
      'Nathaniel Branden: Az öröklés igazságtalan versenyelőnyt jelent? Közkeletű tévhitek a kapitalizmusról',
      'Tóth András: A jó és a rossz egyenlőtlenségről',
    ],
  },
  {
    name: 'Marx és a középosztály',
    articles: [
      'Tóth András: A felemelkedő középosztály problémája (A marxista révedezés és a valóság logikája, I. rész)',
      'Tóth András: Piaci verseny és tudásnövekedés mint a középosztályosodás mozgatórugói (A marxista révedezés és a valóság logikája, II. rész)',
      'Tóth András: Nem, a tőkések nem a kizsákmányolásból élnek jól (A marxista révedezés és a valóság logikája, III. rész)',
      'Tóth András: Ami hiányzik Marx kétosztályos modelljéből: a vállalkozók osztálya (A marxista révedezés és a valóság logikája, IV. rész)',
      'Tóth András: Átjárható osztályok és bevédett rendek a piaci társadalomban (A marxista révedezés és a valóság logikája, V. rész)',
      'Tóth András: S kizsákmányolás nincs is? (A marxista révedezés és a valóság logikája, VI. rész)',
      'Tóth András: A marxi révedezés és a valóság logikája: összefoglaló (VII. rész)',
    ],
  },
  {
    name: 'Munkaerő-piac',
    articles: [
      'Nathaniel Branden: A szakszervezetek védik meg a versenyszféra dolgozóit? Közkeletű tévhitek a kapitalizmusról',
      'David D. Friedman: Kizsákmányolás és kamat',
      'Walter Block: Munkahelyek és munkanélküliség – néhány alapvetés',
      'Némethné Pál Katalin: Minimálbér, az örök gumicsont',
      'Radácsy László: Kizsákmányolás vagy együttműködés?',
    ],
  },
  {
    name: 'Válságok',
    articles: [
      'Nathaniel Branden: A szabadpiac okozta az 1929-33-as válságot? Közkeletű tévhitek a kapitalizmusról ',
      'Brittany Hunter: A 2008-as válság az osztrák közgazdaságtant igazolta',
      'Peter G. Klein: Koronaválság és leviatán',
      'Marcsó Kristóf: Optikai csalódás a koronaválság idején',
    ],
  },
  {
    name: 'Monopólium',
    articles: [
      'Nathaniel Branden: A szabadpiac monopóliumokat teremt? Közkeletű tévhitek a kapitalizmusról',
      'Richard Epstein: Feldarabolja-e az állam a techcégeket?',
      'Murray N. Rothbard: Monopólium és verseny (részlet)',
      'Némethné Pál Katalin: A csókos kapitalizmus hosszú, hosszú alkonya',
      'Tóth András: A tökéletes verseny enigmája és a dinamikus piacgazdaság viszonya a monopóliumokhoz',
    ],
  },
];

export default function Collections({collections}: CollectionsParams) {
  return (
    <>
      <NextSeo
        title={'Cikksorozatok | Menger Intézet'}
        openGraph={{
          url: `https://menger.hu/cikksorozatok/`,
          title: `Cikksorozatok | Menger Intézet`,
          type: 'article',
          images: [
            {
              url: '/assets/images/fb-featured.png',
              width: 1200,
              height: 630,
              type: 'image/png',
            },
          ],
        }}
      />
      <Layout>
        <div className={styles.collectionsContainer}>
          {collections.map((collection, index) => {
            return (
              <div key={index} className={styles.collection}>
                <div className={styles.collectionName}>#{collection.name}</div>
                {collection.articles.map((article, index) => {
                  return (
                    <Link href={`posts/${article.data.slug}`} key={index} passHref>
                      <a>
                        <p className={styles.collectionArticle}>{article.title}</p>
                      </a>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  let collections: Array<Collection> = [];
  for (const collection of COLLECTIONS) {
    let collectionWithData: Collection = {
      name: collection.name,
      articles: [],
    };

    for (const article of collection.articles) {
      const postData = await getPostBySearchQuery(article);
      const filteredPostData = await getFilteredPostData([postData]);
      collectionWithData.articles.push({
        title: article,
        data: filteredPostData[0],
      });
    }

    collections.push(collectionWithData);
  }
  return {props: {collections}};
}
