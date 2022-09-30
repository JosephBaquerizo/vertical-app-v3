import styles from '../../../assets/components/collectionsContainer.module.css';
import CollectionCard from '../collectionCard/collectionCard';
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

export default function CollectionsContainer({ availableCollections, searchField }) {

    return (
        <section className={styles.collectionsContainer}>
            <AiFillCaretLeft className={styles.scrollIcon}/>
            <div className={styles.horizontalScroll}>
            {
                availableCollections.filter(collection => {
                    return collection.name.toLowerCase().includes(searchField.toLowerCase());
                }).map((filteredCollection, index) => {
                    return <CollectionCard key={index} collectionInfo={filteredCollection}/>
                })
            }
            </div>
            <AiFillCaretRight className={styles.scrollIcon}/>
        </section>
    );
} ;