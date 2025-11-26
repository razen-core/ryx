# Ryx Programming Language

**Note:** Ryx was formerly known as Razen. This repository hosts the official development of the language core.

Ryx is a modern, statically typed programming language designed to deliver the specific features and performance that professional developers need. It stands as a promising solution for systems programming, bridging the gap between rapid development cycles and high-performance production deployment.

## Architecture and Compilation

Ryx functions as a high-level frontend that transpiles to C, offering a unique dual-pipeline approach to handle both development iteration and production optimization.

### The Transpilation Workflow
Ryx generates C11-23 standard code from your source, ensuring memory safety and type correctness before handing off to native backend compilers. This architecture allows Ryx to remain lightweight while leveraging decades of compiler optimizations.

### Build Modes
Ryx distinguishes between development speed and execution speed by utilizing different backend compilers:

*   **Rapid Development (`ryx run`):**
    For immediate feedback and testing, Ryx utilizes **TCC (Tiny C Compiler)**. This provides near-instant compilation times, mimicking the "feel" of an interpreted language runtime while still executing native code.

*   **Production Builds (`ryx build`):**
    For final release artifacts, Ryx targets **GCC (or Clang)**. This pipeline prioritizes maximum optimization, producing highly efficient, standalone binaries suitable for production environments.

## Roadmap

We have a structured plan to bring Ryx from Alpha to a production-ready state. Please refer to our official roadmap documentation for detailed milestones and active development phases.

## Copyright and Licensing

**Copyright © 2025 Prathmesh Barot & Razen Core Team.**

This project is licensed under the **Apache License, Version 2.0**.

You may obtain a copy of the License at:
[LICENSE](LICENSE)

**Trademark and Branding Notice:**
The "Ryx" name, the Ryx logo, and all related branding assets are exclusively owned by the Razen Core Team and Prathmesh Barot. They are **not** covered by the Apache License 2.0. You may not use these trademarks to endorse or promote products derived from this software without specific prior written permission.

**Custom Usage Notice:**
Unless required by applicable law or agreed to in writing, software distributed under this License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](LICENSE) file for the specific language governing permissions and limitations under the License. 