import styles from './TagButton.module.scss';

type Props = {
  tag: string;
  handleTagClick: (tag: string) => void;
  selectedTags: string[];
  highlightText?: (text: string) => JSX.Element;
};

export default function TagButton({
                                    tag,
                                    handleTagClick,
                                    selectedTags,
                                    highlightText,
                                  }: Props) {
  return (
    <button
      type="button"
      className={styles.tag}
      onClick={() => handleTagClick(tag)}
    >
      <code className={selectedTags.includes(tag) ? styles.active : ''}>
        {highlightText ? highlightText(tag) : tag}
      </code>
    </button>
  );
}
