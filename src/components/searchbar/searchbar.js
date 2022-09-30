import styles from '../../assets/components/searchbar.module.css';
import { GoSearch } from "react-icons/go";
import cls from 'classnames';

export default function Searchbar({ searchField, onSearchChange, placeholder, clickable = false, clickFunction }) {
    return (
        <div className={styles.searchBarContainer}>
            <input 
                onChange={onSearchChange} 
                className={styles.searchBar}
                type="text"
                placeholder={placeholder} 
                spellCheck="false"
                value={searchField}
              />
              {
                clickable
                ?
                <GoSearch className={cls(styles.icon, styles.clickable)} onClick={clickFunction}/>
                :
                <GoSearch className={styles.icon}/>
              }
        </div>
    );
};