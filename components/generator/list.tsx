import base from '@components/generator/base';
import { useRef, useState } from 'react';
import styles from './list.module.scss';

export default function List() {
  const [inputs, setInputs] = useState<any>([{ value: '' }]);
  const [popoutState, setPopoutState] = useState(false);

  const preRef = useRef<any>(null);

  /**/

  function handleChange({ EVENT, MODE, INDEX }: { EVENT?: any; MODE: 'change' | 'new' | 'delete' | 'library'; INDEX?: any }) {
    const newArray = [...inputs];

    switch (MODE) {
      case 'change':
        newArray[INDEX].value = EVENT.target.value;

        setInputs(newArray);
        break;

      case 'new':
        setInputs([...inputs, { value: '' }]);
        break;

      case 'delete':
        setInputs(
          newArray
            .filter((ITEM: any, INDEX_: number) => INDEX_ !== INDEX)
            .map((ITEM: any) => {
              return ITEM;
            })
        );
        break;

      case 'library':
        setInputs([
          ...newArray
            .filter((ITEM: any, INDEX_: number) => ITEM.value !== '')
            .map((ITEM: any) => {
              return ITEM;
            }),
          { value: EVENT.value },
        ]);

        break;
    }
  }

  /**/

  function clickBoard() {
    if (preRef) {
      navigator.clipboard.writeText(preRef.current.innerText);

      setPopoutState(true);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Games/Apps Priority&nbsp;</h1>

      <p className={styles.desc}>
        Grant the priority of your game/app to high even if you can&apos;t change the permissions from your task manager.
        <br />
        <br />
        This is useful to assign more resources from your computer to the game/app.
        <br />
        <br />
        Easy Anti-Cheat blocks the possible changes through the task manager and that code from below can bypass it.
        <br />
        <br />
        Avoid add apps do not exist **
        <br />
        <br />
        <b>Enjoy it.</b>
      </p>

      <form className={styles.container_form} onSubmit={(EVENT) => EVENT.preventDefault()}>
        <section>
          <h2>Library</h2>

          <div className={styles.container_library}>
            {base.list.map((ITEM: any, INDEX: number) => (
              <button
                key={INDEX}
                onClick={() => handleChange({ MODE: 'library', EVENT: ITEM })}
                disabled={inputs.filter((ITEM_: any) => ITEM.value == ITEM_.value).map((ITEM_: any) => (ITEM_ ? true : false))[0]}
                className='animate__animated animate__headShake'
              >
                {ITEM.label}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2>Custom</h2>

          <div className={styles.container_custom}>
            {inputs.map((ITEM: any, INDEX: number) => (
              <div key={INDEX} className='animate__animated animate__headShake'>
                <input
                  type='text'
                  value={ITEM.value}
                  onChange={(EVENT) => handleChange({ EVENT, MODE: 'change', INDEX: INDEX })}
                />
                <button onClick={() => handleChange({ EVENT: ITEM, MODE: 'delete', INDEX })}>Delete</button>
              </div>
            ))}
          </div>

          <button onClick={() => handleChange({ MODE: 'new' })}>Add game</button>
        </section>
      </form>

      {inputs.length >= 1 && (
        <section className={styles.container_actions}>
          <h2>Your code!</h2>

          <div className={styles.actions}>
            <pre ref={preRef}>
              {inputs.map(
                (ITEM: any, INDEX: number) =>
                  `Windows Registry Editor Version 5.00 \n\n${
                    ITEM.value &&
                    `[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\${
                      ITEM.value
                    }\\PerfOptions]\n"CpuPriorityClass"=dword:00000003\n${inputs.length - 1 == INDEX ? '' : '\n'}`
                  }`
              )}
            </pre>

            <button onClick={() => clickBoard()}>Copy code!</button>
          </div>
        </section>
      )}

      <section className={styles.container_instructions}>
        <h2>Instructions</h2>

        <div>
          <ol>
            <li>Copy the code!</li>
            <li>
              Create a file with your notepad with any name and with the extension &quot;<b>.reg</b>&quot; (example: any.reg)
            </li>
            <li>Save the file</li>
            <li>
              Try to open the file and then click on &quot;Yes&quot; &quot;to allow this app to make changes to your device&quot;
            </li>
            <li>That&apos;s everything!</li>
          </ol>
        </div>
      </section>

      <section className={`${styles.popout} ${popoutState ? styles.enabled : styles.disabled}`}>
        <span>Value save in your clipboard</span>

        <button onClick={() => setPopoutState(false)}>Ok</button>
      </section>

      <footer>
        <p>
          All rights reserved | {new Date().getFullYear()}
          <br />
          <a href='https://slogive.com' rel='noopener nofollow'>
            slogive.com
          </a>
        </p>
      </footer>
    </div>
  );
}
