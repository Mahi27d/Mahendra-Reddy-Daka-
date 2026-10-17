from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]

class ReplicaPromptPackTests(unittest.TestCase):
    def test_master_skill_exists_and_has_all_modes(self):
        master = ROOT / 'skills' / 'replica-master' / 'SKILL.md'
        self.assertTrue(master.is_file())
        text = master.read_text(encoding='utf-8')
        modes = [
            'replica-recon', 'replica-architect', 'replica-design', 'replica-build',
            'replica-backend', 'replica-test', 'replica-diff', 'replica-entrepreneur',
            'replica-brand', 'replica-launch', 'replica-deploy'
        ]
        for mode in modes:
            with self.subTest(mode=mode):
                self.assertIn('/' + mode, text)
                self.assertTrue((ROOT / mode / 'SKILL.md').is_file())

    def test_master_has_honesty_and_security_rules(self):
        text = (ROOT / 'skills' / 'replica-master' / 'SKILL.md').read_text(encoding='utf-8').lower()
        for phrase in ['not run', 'private apis', 'never invent', '.env.example', 'explicit approval']:
            with self.subTest(phrase=phrase):
                self.assertIn(phrase, text)

    def test_readme_discloses_prototype_limitations(self):
        text = (ROOT / 'README.md').read_text(encoding='utf-8').lower()
        for phrase in ['prototype', 'not a drop-in claude plugin', 'not run', 'not an official openai product']:
            with self.subTest(phrase=phrase):
                self.assertIn(phrase, text)

    def test_starter_example_exists(self):
        example = ROOT / 'examples' / 'first-project-prompt.md'
        self.assertTrue(example.is_file())
        self.assertIn('/replica-recon', example.read_text(encoding='utf-8'))

if __name__ == '__main__':
    unittest.main()
